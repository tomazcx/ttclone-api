import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {v4 as uuid} from 'uuid'
import {ShowLikedTweetsService} from '.'

describe('ShowLikedTweetsService', () => {

	let service: ShowLikedTweetsService
	let id: string

	beforeEach(() => {
		service = new ShowLikedTweetsService()
		id = uuid()
	})

	it("should show all user's liked tweets", async () => {
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
			showLikedTweets: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository
		//@ts-expect-error defined part of methods
		service['tweetsRepository'] = mockTweetsRepository

		const result = await service.execute(id)

		expect(result).toStrictEqual(expectedOutput)
		expect(mockUsersRepository.checkId).toBeCalled()
		expect(mockTweetsRepository.showLikedTweets).toBeCalled()
	})

	it('should fail due to not found user', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		await expect(service.execute(id)).rejects.toBeInstanceOf(NotFoundError)
		expect(mockUsersRepository.checkId).toBeCalled()
	})

})
