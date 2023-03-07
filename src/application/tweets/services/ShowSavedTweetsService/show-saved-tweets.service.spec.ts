import {v4 as uuid} from 'uuid'
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {ShowSavedTweetsService} from '.'
import {AbstractShowSavedTweets} from 'src/domain/tweets/services/abstract-show-saved-tweets.service'

describe('ShowSavedTweetsService', () => {

	let service: AbstractShowSavedTweets
	let id: string
	let tweetId: string
	let date: Date

	beforeEach(() => {
		service = new ShowSavedTweetsService()
		id = uuid()
		tweetId = uuid()
		date = new Date
	})

	it("should show the user's saved tweets", async () => {

		const expectedOutput = [{
			id: tweetId,
			content: 'test-content',
			created_at: date
		}]

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		const mockTweetsRepository = {
			showSavedTweets: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
		}

		service['usersRepository'] = mockUsersRepository
		service['tweetsRepository'] = mockTweetsRepository

		const result = await service.execute(id)

		expect(result).toStrictEqual(expectedOutput)
		expect(mockUsersRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.showSavedTweets).toBeCalled()
	})

	it('should fail due to not found user', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		service['usersRepository'] = mockUsersRepository

		await expect(service.execute(id)).rejects.toBeInstanceOf(NotFoundError)
	})

})
