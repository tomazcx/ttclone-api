import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {v4 as uuid} from 'uuid'
import {ShowWhoRetweetedService} from '.'

describe('ShowWhoRetweetedService', () => {

	let service: ShowWhoRetweetedService
	let tweetId: string
	let id: string

	beforeEach(() => {
		service = new ShowWhoRetweetedService()
		tweetId = uuid()
		id = uuid()
	})

	it('should show who retweeted the tweet', async () => {
		const expectedOutput = [{
			id,
			name: 'test-name',
			email: 'test@email.com',
			user: '@test',
			created_at: new Date()
		}]

		const mockTweetsRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			showWhoRetweeted: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
		}

		//@ts-expect-error defined part of methods
		service['tweetsRepository'] = mockTweetsRepository

		const result = await service.execute(tweetId)

		expect(result).toStrictEqual(expectedOutput)
		expect(mockTweetsRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.showWhoRetweeted).toBeCalled()
	})

	it('should fail due to not found tweet', async () => {
		const mockTweetsRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false)),
		}

		//@ts-expect-error defined part of methods
		service['tweetsRepository'] = mockTweetsRepository

		await expect(service.execute(tweetId)).rejects.toBeInstanceOf(NotFoundError)
	})

})

