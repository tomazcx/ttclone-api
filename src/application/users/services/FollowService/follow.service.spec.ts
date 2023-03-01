import {FollowService} from "."
import {v4 as uuid} from 'uuid'
import {User} from "src/domain/users/entities/User"
import {UnprocessableEntityError} from "src/infra/common/errors/types/UnprocessableEntityError"
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"

describe("FollowService", () => {

	let followService: FollowService
	let followerId: string
	let userToFollowId: string

	beforeEach(() => {
		followService = new FollowService()
		followerId = uuid()
		userToFollowId = uuid()
	})

	it('should follow a user', async () => {
		const mockUsersRepository = {
			showUser: jest.fn().mockReturnValue(Promise.resolve({} as User)),
			follow: jest.fn().mockReturnValue(Promise.resolve())
		}

		//@ts-expect-error defined part of methods
		followService['usersRepository'] = mockUsersRepository

		await followService.execute(userToFollowId, followerId)

		expect(mockUsersRepository.follow).toBeCalled()
		expect(mockUsersRepository.showUser).toBeCalled()
	})

	it("should fail due to inexistent user to follow and/or to be followed", async () => {
		const mockUsersRepository = {
			showUser: jest.fn().mockReturnValue(Promise.resolve(undefined)),
		}

		//@ts-expect-error defined part of methods
		followService['usersRepository'] = mockUsersRepository

		await expect(followService.execute(userToFollowId, followerId)).rejects.toBeInstanceOf(NotFoundError)
		expect(mockUsersRepository.showUser).toBeCalled()
	})

	it("should fail due to both ids being the same ", async () => {

		followerId = userToFollowId

		const mockUsersRepository = {
			showUser: jest.fn().mockReturnValue(Promise.resolve({} as User)),
		}

		//@ts-expect-error defined part of methods
		followService['usersRepository'] = mockUsersRepository

		await expect(followService.execute(userToFollowId, followerId)).rejects.toBeInstanceOf(UnprocessableEntityError)
	})


})
