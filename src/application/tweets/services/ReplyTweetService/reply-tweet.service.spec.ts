import {v4 as uuid} from 'uuid'
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {ReplyTweetService} from "."
import {AbstractReplyTweet} from 'src/domain/tweets/services/abstract-reply-tweet.service'

describe('ReplyTweetService', () => {

	let service: AbstractReplyTweet
	let tweetId: string
	let authorId: string

	beforeEach(() => {
		service = new ReplyTweetService()
		tweetId = uuid()
		authorId = uuid()
	})

	it('should reply a tweet', async () => {

		const expectedOutput = {
			id: uuid(),
			content: 'test-content',
			created_at: new Date,
			replyId: null,
			retweetWIthCOmmentToId: tweetId,
			author: {
				id: authorId,
				name: 'test-name',
				email: 'test@email.com',
				user: '@test',
				created_at: new Date
			}
		}

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		const mockTweetsRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			replyTweet: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
		}

		service['usersRepository'] = mockUsersRepository
		service['tweetsRepository'] = mockTweetsRepository

		const createTweetDto = {
			content: 'test-content'
		}

		const result = await service.execute(createTweetDto, tweetId, authorId)

		expect(result).toStrictEqual(expectedOutput)
		expect(mockUsersRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.replyTweet).toBeCalled()
	})

	it('should fail due to not found user', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		service['usersRepository'] = mockUsersRepository
		const createTweetDto = {
			content: 'test-content'
		}

		await expect(service.execute(createTweetDto, tweetId, authorId)).rejects.toBeInstanceOf(NotFoundError)
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

		const createTweetDto = {
			content: 'test-content'
		}

		await expect(service.execute(createTweetDto, tweetId, authorId)).rejects.toBeInstanceOf(NotFoundError)
	})

})
