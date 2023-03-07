import {AbstractDeleteTweet} from 'src/domain/tweets/services/abstract-delete-tweet.service'
import {ForbiddenError} from 'src/infra/common/errors/types/ForbiddenError'
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {v4 as uuid} from 'uuid'
import {DeleteTweetService} from '.'

describe('DeleteTweetService', () => {

	let service: AbstractDeleteTweet
	let authorId: string
	let id: string

	beforeEach(() => {
		service = new DeleteTweetService()
		id = uuid()
		authorId = uuid()
	})

	it('should show the tweet with the informed id', async () => {

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		const mockTweetsRepository = {
			verifyAuthor: jest.fn().mockReturnValue(Promise.resolve(true)),
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			delete: jest.fn().mockReturnValue(Promise.resolve())
		}

		service['tweetsRepository'] = mockTweetsRepository
		service['usersRepository'] = mockUsersRepository

		await service.execute(id, authorId)

		expect(mockTweetsRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.delete).toBeCalled()
	})

	it('should fail due to not foud user', async () => {

		const mockTweetsRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
		}

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		service['usersRepository'] = mockUsersRepository
		service['tweetsRepository'] = mockTweetsRepository

		await expect(service.execute(id, authorId)).rejects.toBeInstanceOf(NotFoundError)

	})

	it('should fail due to not being able to delete because you are not the author', async () => {
		const mockTweetsRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			verifyAuthor: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		service['usersRepository'] = mockUsersRepository
		service['tweetsRepository'] = mockTweetsRepository

		await expect(service.execute(id, authorId)).rejects.toBeInstanceOf(ForbiddenError)

	})

	it('should fail due to not found tweet', async () => {
		const mockTweetsRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false)),
		}

		service['tweetsRepository'] = mockTweetsRepository

		await expect(service.execute(id, authorId)).rejects.toBeInstanceOf(NotFoundError)
		expect(mockTweetsRepository.checkId).toBeCalled()
	})

})
