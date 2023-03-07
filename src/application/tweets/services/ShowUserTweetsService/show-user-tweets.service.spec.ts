import {AbstractShowUserTweets} from 'src/domain/tweets/services/abstract-show-user-tweets.service'
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {v4 as uuid} from 'uuid'
import {ShowUserTweetsService} from '.'

describe('ShowUserTweetsService', () => {

	let service: AbstractShowUserTweets
	let id: string

	beforeEach(() => {
		service = new ShowUserTweetsService()
		id = uuid()
	})

	it('should show all users tweets', async () => {
		const expectedOutput = [{
			id: uuid(),
			content: 'test-content',
			authorId: id,
			created_at: new Date()
		}]

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		const mockTweetsRepository = {
			showUserTweets: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
		}

		service['usersRepository'] = mockUsersRepository
		service['tweetsRepository'] = mockTweetsRepository

		const result = await service.execute(id)

		expect(result).toStrictEqual(expectedOutput)
		expect(mockUsersRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.showUserTweets).toBeCalled()
	})

	it('should fail due to not found user', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		service['usersRepository'] = mockUsersRepository

		await expect(service.execute(id)).rejects.toBeInstanceOf(NotFoundError)
		expect(mockUsersRepository.checkId).toBeCalled()
	})

})
