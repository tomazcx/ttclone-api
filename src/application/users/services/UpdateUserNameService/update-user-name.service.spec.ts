import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {UnprocessableEntityError} from 'src/infra/common/errors/types/UnprocessableEntityError'
import {v4 as uuid} from 'uuid'
import {UpdateUserNameService} from '.'

describe('UpdateUserNameService', () => {

	let service: UpdateUserNameService
	let id: string
	let date: Date

	beforeEach(() => {
		service = new UpdateUserNameService()
		id = uuid()
		date = new Date()
	})


	it("it should update the user's user name", async () => {

		const expectedOutput = {
			id,
			name: "test-name",
			email: 'test-email',
			user: '@updated',
			created_at: date
		}

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			updateUserName: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
			checkUserName: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		const updateUserNameDto = {
			user: '@updated'
		}

		const result = await service.execute(updateUserNameDto, id)

		expect(result).toStrictEqual(expectedOutput)
		expect(mockUsersRepository.checkId).toBeCalled()
		expect(mockUsersRepository.checkUserName).toBeCalled()
		expect(mockUsersRepository.updateUserName).toBeCalled()
	})

	it('should should fail due to not found user', async () => {

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		const updateUserNameDto = {
			user: '@updated'
		}

		await expect(service.execute(updateUserNameDto, id)).rejects.toBeInstanceOf(NotFoundError)
	})

	it('should fail due to user name already being used', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			checkUserName: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository


		const updateUserNameDto = {
			user: '@updated'
		}

		await expect(service.execute(updateUserNameDto, id)).rejects.toBeInstanceOf(UnprocessableEntityError)
		expect(mockUsersRepository.checkId).toBeCalled()

	})


})
