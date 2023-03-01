import {NotFoundError} from 'src/infra/common/errors/types'
import {User} from 'src/domain/users/entities/User'
import {v4 as uuid} from 'uuid'
import {UnfollowService} from '.'
import {UnprocessableEntityError} from 'src/infra/common/errors/types/UnprocessableEntityError'

describe('UnfollowService', () => {

	let service: UnfollowService
	let userToUnfollowId: string
	let unfollowerId: string

	beforeEach(() => {
		service = new UnfollowService()
		userToUnfollowId = uuid()
		unfollowerId = uuid()
	})

	it('should unfollow', async () => {
		const mockUsersRepository = {
			showUser: jest.fn().mockReturnValue(Promise.resolve({} as User)),
			unfolllow: jest.fn().mockReturnValue(Promise.resolve())
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		await service.execute(userToUnfollowId, unfollowerId)

		expect(mockUsersRepository.showUser).toBeCalled()
		expect(mockUsersRepository.unfolllow).toBeCalled()
	})

	it('should fail due to inexistent user id', async () => {
		const mockUsersRepository = {
			showUser: jest.fn().mockReturnValue(Promise.resolve(undefined))
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		await expect(service.execute(userToUnfollowId, unfollowerId)).rejects.toBeInstanceOf(NotFoundError)
		expect(mockUsersRepository.showUser).toBeCalled()
	})

	it('should fail due to same ids', async () => {

		unfollowerId = userToUnfollowId

		const mockUsersRepository = {
			showUser: jest.fn().mockReturnValue(Promise.resolve({} as User)),
			unfolllow: jest.fn().mockReturnValue(Promise.resolve())
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		await expect(service.execute(userToUnfollowId, unfollowerId)).rejects.toBeInstanceOf(UnprocessableEntityError)
	})

})
