import {SignInService} from "."
import {v4 as uuid} from 'uuid'
import * as bcrypt from 'bcrypt'
import {BadRequestError} from "src/infra/common/errors/types/BadRequestError"

describe('SignInService', () => {

	let signInService: SignInService
	let id: string
	let hashedPassword: string

	beforeEach(async () => {
		signInService = new SignInService()
		id = uuid()
		hashedPassword = await bcrypt.hash('1234', 12)
	})

	it('should return a signed jwt', async () => {

		const expectedOutput = {
			id,
			email: 'test@email.com',
			password: hashedPassword
		}

		const mockAuthRepository = {
			checkEmail: jest.fn().mockReturnValue(Promise.resolve(true)),
			getAuthCredentials: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
		}

		//@ts-expect-error defined part of methods
		signInService['authRepository'] = mockAuthRepository

		const signInDto = {
			email: 'test@gmail.com',
			password: '1234'
		}

		const token = await signInService.execute(signInDto)

		expect(mockAuthRepository.checkEmail).toBeCalled()
		expect(mockAuthRepository.getAuthCredentials).toBeCalled()
		expect(typeof token).toBe('string')
	})

	it('should fail due to wrong email', async () => {

		const mockAuthRepository = {
			checkEmail: jest.fn().mockReturnValue(Promise.resolve(false)),
		}

		//@ts-expect-error defined part of methods
		signInService['authRepository'] = mockAuthRepository

		const signInDto = {
			email: 'test@gmail.com',
			password: '1234'
		}

		await expect(signInService.execute(signInDto)).rejects.toBeInstanceOf(BadRequestError)
		expect(mockAuthRepository.checkEmail).toBeCalled()
	})

	it('should fail due to invalid password', async () => {
		const expectedOutput = {
			id,
			email: 'test@email.com',
			password: hashedPassword
		}

		const mockAuthRepository = {
			checkEmail: jest.fn().mockReturnValue(Promise.resolve(true)),
			getAuthCredentials: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
		}

		//@ts-expect-error defined part of methods
		signInService['authRepository'] = mockAuthRepository

		const signInDto = {
			email: 'test@gmail.com',
			password: '12345'
		}

		await expect(signInService.execute(signInDto)).rejects.toBeInstanceOf(BadRequestError)
		expect(mockAuthRepository.checkEmail).toBeCalled()
		expect(mockAuthRepository.getAuthCredentials).toBeCalled()
	})


})
