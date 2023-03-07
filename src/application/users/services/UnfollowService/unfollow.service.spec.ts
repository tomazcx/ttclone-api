import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {v4 as uuid} from 'uuid'
import {UnfollowService} from '.'
import {UnprocessableEntityError} from 'src/infra/common/errors/types/UnprocessableEntityError'
import {BadRequestError} from 'src/infra/common/errors/types/BadRequestError'
import {AbstractUnfollow} from 'src/domain/users/services/abstract-unfollow.service'

describe('UnfollowService', () => {

	let service: AbstractUnfollow
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

		service['usersRepository'] = mockUsersRepository

		await service.execute(userToUnfollowId, unfollowerId)

		expect(mockUsersRepository.checkId).toBeCalled()
		expect(mockUsersRepository.unfollow).toBeCalled()
	})

	it('should fail due to inexistent user id', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false))
		}

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

		service['usersRepository'] = mockUsersRepository

		await expect(service.execute(userToUnfollowId, unfollowerId)).rejects.toBeInstanceOf(UnprocessableEntityError)
	})

	it('should throw a bad request error due to not following the informed user', async () => {

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			verifyUserFollowing: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		service['usersRepository'] = mockUsersRepository

		await expect(service.execute(userToUnfollowId, unfollowerId)).rejects.toBeInstanceOf(BadRequestError)


	})

})
