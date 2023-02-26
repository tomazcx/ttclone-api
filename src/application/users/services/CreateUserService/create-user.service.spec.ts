import {BadRequestError} from 'src/infra/common/errors/types/BadRequestError'
import {v4 as uuid} from 'uuid'
import {CreateUserService} from '.'

describe('CreateUserService', () => {

	let createUserService: CreateUserService
	let date: Date
	let id: string

	beforeEach(() => {
		createUserService = new CreateUserService()
		date = new Date()
		id = uuid()
	})

	it('should show create a new user', async () => {
		const createUserDto = {
			name: 'test-name',
			user: '@test',
			email: 'test-email',
			password: 'test-password',
			confirmPassword: 'test-password'
		}

		const expectedOutput = {
			id,
			name: 'test-name',
			user: '@test',
			email: 'test@gmail.com',
			created_at: date

		}

		const mockUsersRepository = {
			createUser: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
			checkEmail: jest.fn().mockReturnValue(Promise.resolve(false)),
			checkUserName: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		//@ts-expect-error defined part of methods
		createUserService['usersRepository'] = mockUsersRepository

		const result = await createUserService.execute(createUserDto)

		expect(mockUsersRepository.createUser).toBeCalled()
		expect(result).toStrictEqual(expectedOutput)

	})

	it('should fail due to wrong passwords', async () => {

		const createUserDto = {
			name: 'test-name',
			user: '@test',
			email: 'test-email',
			password: 'test-password',
			confirmPassword: 'testpassword'
		}

		const mockUsersRepository = {
			createUser: jest.fn().mockReturnValue(Promise.resolve(false)),
			checkEmail: jest.fn().mockReturnValue(Promise.resolve(false)),
			checkUserName: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		//@ts-expect-error defined part of methods
		createUserService['usersRepository'] = mockUsersRepository

		await expect(createUserService.execute(createUserDto)).rejects.toThrow(BadRequestError)

	})

	it('should fail due to existent email', async () => {
		const createUserDto = {
			name: 'test-name',
			user: '@test',
			email: 'test-email',
			password: 'test-password',
			confirmPassword: 'testpassword'
		}

		const mockUsersRepository = {
			createUser: jest.fn().mockReturnValue(Promise.resolve(false)),
			checkEmail: jest.fn().mockReturnValue(Promise.resolve(true)),
			checkUserName: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		//@ts-expect-error defined part of methods
		createUserService['usersRepository'] = mockUsersRepository

		await expect(createUserService.execute(createUserDto)).rejects.toThrow(BadRequestError)

	})

	it('should fail due to existent user', async () => {
		const createUserDto = {
			name: 'test-name',
			user: '@test',
			email: 'test-email',
			password: 'test-password',
			confirmPassword: 'testpassword'
		}

		const mockUsersRepository = {
			createUser: jest.fn().mockReturnValue(Promise.resolve(false)),
			checkEmail: jest.fn().mockReturnValue(Promise.resolve(false)),
			checkUserName: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		//@ts-expect-error defined part of methods
		createUserService['usersRepository'] = mockUsersRepository

		await expect(createUserService.execute(createUserDto)).rejects.toThrow(BadRequestError)

	})


})

