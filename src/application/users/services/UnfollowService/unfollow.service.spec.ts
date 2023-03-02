import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {User} from 'src/domain/users/entities/User'
import {v4 as uuid} from 'uuid'
import {UnfollowService} from '.'
import {UnprocessableEntityError} from 'src/infra/common/errors/types/UnprocessableEntityError'
import {BadRequestError} from 'src/infra/common/errors/types/BadRequestError'

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
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			unfollow: jest.fn().mockReturnValue(Promise.resolve()),
			verifyUserFollowing: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		await service.execute(userToUnfollowId, unfollowerId)

		expect(mockUsersRepository.checkId).toBeCalled()
		expect(mockUsersRepository.unfollow).toBeCalled()
	})

	it('should fail due to inexistent user id', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		await expect(service.execute(userToUnfollowId, unfollowerId)).rejects.toBeInstanceOf(NotFoundError)
		expect(mockUsersRepository.checkId).toBeCalled()
	})

	it('should fail due to same ids', async () => {

		unfollowerId = userToUnfollowId

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			unfollow: jest.fn().mockReturnValue(Promise.resolve())
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		await expect(service.execute(userToUnfollowId, unfollowerId)).rejects.toBeInstanceOf(UnprocessableEntityError)
	})

	it('should throw a bad request error due to not following the informed user', async () => {

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			verifyUserFollowing: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		await expect(service.execute(userToUnfollowId, unfollowerId)).rejects.toBeInstanceOf(BadRequestError)


	})

})
