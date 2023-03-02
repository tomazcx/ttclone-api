import {FollowService} from "."
import {v4 as uuid} from 'uuid'
import {User} from "src/domain/users/entities/User"
import {UnprocessableEntityError} from "src/infra/common/errors/types/UnprocessableEntityError"
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"
import {BadRequestError} from "src/infra/common/errors/types/BadRequestError"

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
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			follow: jest.fn().mockReturnValue(Promise.resolve()),
			verifyUserFollowing: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		//@ts-expect-error defined part of methods
		followService['usersRepository'] = mockUsersRepository

		await followService.execute(userToFollowId, followerId)

		expect(mockUsersRepository.follow).toBeCalled()
		expect(mockUsersRepository.checkId).toBeCalled()
	})

	it("should fail due to inexistent user to follow and/or to be followed", async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false)),
		}

		//@ts-expect-error defined part of methods
		followService['usersRepository'] = mockUsersRepository

		await expect(followService.execute(userToFollowId, followerId)).rejects.toBeInstanceOf(NotFoundError)
		expect(mockUsersRepository.checkId).toBeCalled()
	})

	it("should fail due to both ids being the same ", async () => {

		followerId = userToFollowId

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
		}

		//@ts-expect-error defined part of methods
		followService['usersRepository'] = mockUsersRepository

		await expect(followService.execute(userToFollowId, followerId)).rejects.toBeInstanceOf(UnprocessableEntityError)
	})

	it('should throw a bad request error due to already follwing the informed user', async () => {

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			verifyUserFollowing: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		//@ts-expect-error defined part of methods
		followService['usersRepository'] = mockUsersRepository

		await expect(followService.execute(userToFollowId, followerId)).rejects.toBeInstanceOf(BadRequestError)

	})

})
