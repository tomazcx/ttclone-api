import {AbstractToggleRetweet} from 'src/domain/tweets/services/abstract-toggle-retweet.service'
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {v4 as uuid} from 'uuid'
import {ToggleRetweetService} from '.'

describe('ToggleRetweetService', () => {

	let service: AbstractToggleRetweet
	let tweetId: string
	let userWhoRetweetsId: string

	beforeEach(() => {
		service = new ToggleRetweetService()
		tweetId = uuid()
		userWhoRetweetsId = uuid()
	})

	it('should retweet', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		const mockTweetsRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			verifyIfUserRetweeted: jest.fn().mockReturnValue(Promise.resolve(false)),
			retweet: jest.fn().mockReturnValue(Promise.resolve()),
			removeRetweet: jest.fn().mockReturnValue(Promise.resolve())
		}

		service['usersRepository'] = mockUsersRepository
		service['tweetsRepository'] = mockTweetsRepository

		await service.execute(tweetId, userWhoRetweetsId)

		expect(mockUsersRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.verifyIfUserRetweeted).toBeCalled()
		expect(mockTweetsRepository.retweet).toBeCalled()
		expect(mockTweetsRepository.removeRetweet).not.toHaveBeenCalled()
	})

	it('should remove the retweet if already retweeted', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		const mockTweetsRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			verifyIfUserRetweeted: jest.fn().mockReturnValue(Promise.resolve(true)),
			removeRetweet: jest.fn().mockReturnValue(Promise.resolve()),
			retweet: jest.fn().mockReturnValue(Promise.resolve()),
		}

		service['usersRepository'] = mockUsersRepository
		service['tweetsRepository'] = mockTweetsRepository

		await service.execute(tweetId, userWhoRetweetsId)

		expect(mockUsersRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.verifyIfUserRetweeted).toBeCalled()
		expect(mockTweetsRepository.removeRetweet).toBeCalled()
		expect(mockTweetsRepository.retweet).not.toHaveBeenCalled()
	})


	it('should fail due to not found user', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		service['usersRepository'] = mockUsersRepository

		await expect(service.execute(tweetId, userWhoRetweetsId)).rejects.toBeInstanceOf(NotFoundError)
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

		await expect(service.execute(tweetId, userWhoRetweetsId)).rejects.toBeInstanceOf(NotFoundError)
	})

})
