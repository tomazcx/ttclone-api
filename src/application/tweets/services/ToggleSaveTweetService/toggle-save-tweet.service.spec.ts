import {AbstractToggleSaveTweet} from 'src/domain/tweets/services/abstract-toggle-save-tweet.service'
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {v4 as uuid} from 'uuid'
import {ToggleSaveTweetService} from '.'

describe('ToggleSaveTweetService', () => {

	let service: AbstractToggleSaveTweet
	let tweetId: string
	let userWhoSavesId: string

	beforeEach(() => {
		service = new ToggleSaveTweetService()
		tweetId = uuid()
		userWhoSavesId = uuid()
	})

	it('should save the tweet', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		const mockTweetsRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			verifyIfUserSaved: jest.fn().mockReturnValue(Promise.resolve(false)),
			saveTweet: jest.fn().mockReturnValue(Promise.resolve()),
			removeSavedTweet: jest.fn().mockReturnValue(Promise.resolve())
		}

		service['usersRepository'] = mockUsersRepository
		service['tweetsRepository'] = mockTweetsRepository

		await service.execute(tweetId, userWhoSavesId)

		expect(mockUsersRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.verifyIfUserSaved).toBeCalled()
		expect(mockTweetsRepository.saveTweet).toBeCalled()
		expect(mockTweetsRepository.removeSavedTweet).not.toHaveBeenCalled()
	})

	it('should remove from saves if already saved', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		const mockTweetsRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			verifyIfUserSaved: jest.fn().mockReturnValue(Promise.resolve(true)),
			saveTweet: jest.fn().mockReturnValue(Promise.resolve()),
			removeSavedTweet: jest.fn().mockReturnValue(Promise.resolve())
		}

		service['usersRepository'] = mockUsersRepository
		service['tweetsRepository'] = mockTweetsRepository

		await service.execute(tweetId, userWhoSavesId)

		expect(mockUsersRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.verifyIfUserSaved).toBeCalled()
		expect(mockTweetsRepository.removeSavedTweet).toBeCalled()
		expect(mockTweetsRepository.saveTweet).not.toHaveBeenCalled()
	})


	it('should fail due to not found user', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		service['usersRepository'] = mockUsersRepository

		await expect(service.execute(tweetId, userWhoSavesId)).rejects.toBeInstanceOf(NotFoundError)
	})

	it('should fail due to not found tweet', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		const mockTweetsRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		service['usersRepository'] = mockUsersRepository
		service['tweetsRepository'] = mockTweetsRepository

		await expect(service.execute(tweetId, userWhoSavesId)).rejects.toBeInstanceOf(NotFoundError)
	})

})
