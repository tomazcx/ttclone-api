import {v4 as uuid} from 'uuid'
import {AbstractShowReplies} from "src/domain/tweets/services/abstract-show-replies.service"
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {ShowRepliesService} from '.'

describe('Should show all replies from a tweet', () => {

	let service: AbstractShowReplies
	let id: string

	beforeEach(() => {
		service = new ShowRepliesService()
		id = uuid()
	})

	it('should show all replies from a tweet', async () => {

		const expectedOutput = [{
			id: uuid(),
			content: 'test-content',
			authorId: uuid(),
			created_at: new Date(),
			replyId: id,
			retweetWithCommentToId: null

		}]

		const mockTweetsRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			showReplies: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
		}

		service['tweetsRepository'] = mockTweetsRepository

		const result = await service.execute(id)

		expect(result).toStrictEqual(expectedOutput)
		expect(mockTweetsRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.showReplies).toBeCalled()
	})

	it('should fail due to not found tweet', async () => {
		const mockTweetsRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		service['tweetsRepository'] = mockTweetsRepository

		await expect(service.execute(id)).rejects.toBeInstanceOf(NotFoundError)
		expect(mockTweetsRepository.checkId).toBeCalled()

	})


})
