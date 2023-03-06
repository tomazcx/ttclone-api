import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {v4 as uuid} from 'uuid'
import {ShowTweetService} from '.'

describe('ShowTweetService', () => {

	let service: ShowTweetService
	let id: string

	beforeEach(() => {
		service = new ShowTweetService()
		id = uuid()
	})

	it('should show the tweet with the informed id', async () => {
		const expectedOutput = {
			id,
			content: 'test-content',
			authorId: id,
			created_at: new Date()
		}

		const mockTweetsRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			showTweet: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
		}

		//@ts-expect-error defined part of methods
		service['tweetsRepository'] = mockTweetsRepository

		const result = await service.execute(id)

		expect(result).toStrictEqual(expectedOutput)
		expect(mockTweetsRepository.showTweet).toBeCalled()
	})

	it('should fail due to not found tweet', async () => {
		const mockTweetsRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false)),
		}

		//@ts-expect-error defined part of methods
		service['tweetsRepository'] = mockTweetsRepository

		await expect(service.execute(id)).rejects.toBeInstanceOf(NotFoundError)
		expect(mockTweetsRepository.checkId).toBeCalled()
	})

})
