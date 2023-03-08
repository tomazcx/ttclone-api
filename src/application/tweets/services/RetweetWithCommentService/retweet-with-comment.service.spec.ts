import {AbstractRetweetWithComment} from "src/domain/tweets/services/abstract-retweet-with-comment.service"
import {v4 as uuid} from 'uuid'
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {RetweetWithCommentService} from "."

describe('RetweetWithCommentService', () => {

	let service: AbstractRetweetWithComment
	let tweetId: string
	let userWhoRetweetsId: string

	beforeEach(() => {
		service = new RetweetWithCommentService()
		tweetId = uuid()
		userWhoRetweetsId = uuid()
	})

	it('should retweet with a comment', async () => {

		const expectedOutput = {
			id: uuid(),
			content: 'test-content',
			created_at: new Date,
			replyId: null,
			retweetWIthCOmmentToId: tweetId,
			author: {
				id: userWhoRetweetsId,
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
			retweetWithComment: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
		}

		service['usersRepository'] = mockUsersRepository
		service['tweetsRepository'] = mockTweetsRepository

		const createTweetDto = {
			content: 'test-content'
		}

		const result = await service.execute(createTweetDto, tweetId, userWhoRetweetsId)

		expect(result).toStrictEqual(expectedOutput)
		expect(mockUsersRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.retweetWithComment).toBeCalled()
	})

	it('should fail due to not found user', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		service['usersRepository'] = mockUsersRepository
		const createTweetDto = {
			content: 'test-content'
		}

		await expect(service.execute(createTweetDto, tweetId, userWhoRetweetsId)).rejects.toBeInstanceOf(NotFoundError)
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

		await expect(service.execute(createTweetDto, tweetId, userWhoRetweetsId)).rejects.toBeInstanceOf(NotFoundError)
	})

})
