import {AbstractToggleLikeTweet} from 'src/domain/tweets/services/abstract-toggle-like-tweet.service'
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {v4 as uuid} from 'uuid'
import {ToggleLikeTweetService} from '.'

describe('ToggleLikeTweetService', () => {

	let service: AbstractToggleLikeTweet
	let tweetId: string
	let userWhoLikesId: string

	beforeEach(() => {
		service = new ToggleLikeTweetService()
		tweetId = uuid()
		userWhoLikesId = uuid()
	})

	it('should like the tweet', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		const mockTweetsRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			verifyIfUserLiked: jest.fn().mockReturnValue(Promise.resolve(false)),
			likeTweet: jest.fn().mockReturnValue(Promise.resolve()),
			removeLikeTweet: jest.fn().mockReturnValue(Promise.resolve())
		}

		service['usersRepository'] = mockUsersRepository
		service['tweetsRepository'] = mockTweetsRepository

		await service.execute(tweetId, userWhoLikesId)

		expect(mockUsersRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.verifyIfUserLiked).toBeCalled()
		expect(mockTweetsRepository.likeTweet).toBeCalled()
		expect(mockTweetsRepository.removeLikeTweet).not.toHaveBeenCalled()
	})

	it('should remove the like if already liked', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		const mockTweetsRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			verifyIfUserLiked: jest.fn().mockReturnValue(Promise.resolve(true)),
			removeLikeTweet: jest.fn().mockReturnValue(Promise.resolve()),
			likeTweet: jest.fn().mockReturnValue(Promise.resolve()),
		}

		service['usersRepository'] = mockUsersRepository
		service['tweetsRepository'] = mockTweetsRepository

		await service.execute(tweetId, userWhoLikesId)

		expect(mockUsersRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.verifyIfUserLiked).toBeCalled()
		expect(mockTweetsRepository.removeLikeTweet).toBeCalled()
		expect(mockTweetsRepository.likeTweet).not.toHaveBeenCalled()
	})


	it('should fail due to not found user', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		service['usersRepository'] = mockUsersRepository

		await expect(service.execute(tweetId, userWhoLikesId)).rejects.toBeInstanceOf(NotFoundError)
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

		await expect(service.execute(tweetId, userWhoLikesId)).rejects.toBeInstanceOf(NotFoundError)
	})

})
