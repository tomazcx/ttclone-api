import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {v4 as uuid} from 'uuid'
import {CreateTweetService} from '.'

describe("CreateTweetService", () => {

	let service: CreateTweetService
	let authorId: string
	let id: string
	let date: Date

	beforeEach(() => {
		service = new CreateTweetService()
		authorId = uuid()
		id = uuid()
		date = new Date()
	})

	it('should create a tweet', async () => {
		const expectedOutput = {
			id,
			content: 'content-tweet',
			authorId,
			created_at: date
		}

		const mockTweetsRepository = {
			create: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
		}

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		const createTweetDto = {
			content: 'content-tweet'
		}

		//@ts-expect-error defined part of methods
		service['tweetsRepository'] = mockTweetsRepository
		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		const result = await service.execute(createTweetDto, authorId)

		expect(result).toStrictEqual(expectedOutput)
		expect(mockTweetsRepository.create).toBeCalled()
		expect(mockUsersRepository.checkId).toBeCalled()
	})

	it('should fail due to not found author', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		const createTweetDto = {
			content: 'content-tweet'
		}

		//@ts-expect-error defined part of methods	
		service['usersRepository'] = mockUsersRepository

		await expect(service.execute(createTweetDto, authorId)).rejects.toBeInstanceOf(NotFoundError)

	})

})
