import {AbstractShowWhoLiked} from 'src/domain/tweets/services/abstract-show-who-liked.service'
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {v4 as uuid} from 'uuid'
import {ShowWhoLikedService} from '.'

describe('ShowWhoLikedService', () => {

	let service: AbstractShowWhoLiked
	let tweetId: string
	let id: string

	beforeEach(() => {
		service = new ShowWhoLikedService()
		tweetId = uuid()
		id = uuid()
	})

	it('should show who liked the tweet', async () => {
		const expectedOutput = [{
			id,
			name: 'test-name',
			email: 'test@email.com',
			user: '@test',
			created_at: new Date()
		}]

		const mockTweetsRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			showWhoLiked: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
		}

		service['tweetsRepository'] = mockTweetsRepository

		const result = await service.execute(tweetId)

		expect(result).toStrictEqual(expectedOutput)
		expect(mockTweetsRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.showWhoLiked).toBeCalled()
	})

	it('should fail due to not found tweet', async () => {
		const mockTweetsRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false)),
		}

		service['tweetsRepository'] = mockTweetsRepository

		await expect(service.execute(tweetId)).rejects.toBeInstanceOf(NotFoundError)
	})

})

