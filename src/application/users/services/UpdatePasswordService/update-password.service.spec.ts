import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {v4 as uuid} from 'uuid'
import {UpdatePasswordService} from '.'
import * as bcrypt from 'bcrypt'
import {UnprocessableEntityError} from 'src/infra/common/errors/types/UnprocessableEntityError'
import {BadRequestError} from 'src/infra/common/errors/types/BadRequestError'

describe('UpdatePasswordService', () => {

	let service: UpdatePasswordService
	let id: string
	let hashedPassword: string

	beforeEach(async () => {
		service = new UpdatePasswordService()
		id = uuid()
		hashedPassword = await bcrypt.hash('1234', 12)
	})

	it("should update the password of the user with the informed id", async () => {
		const expectedOutput = {
			id,
			name: 'updated-name',
			email: 'test@email.com',
			user: '@test'
		}

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			getPassword: jest.fn().mockReturnValue(Promise.resolve(hashedPassword)),
			updatePassword: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		const updatePasswordDto = {
			oldPassword: '1234',
			password: 'test-password',
			confirmPassword: 'test-password'
		}

		const result = await service.execute(updatePasswordDto, id)

		expect(result).toStrictEqual(expectedOutput)
		expect(mockUsersRepository.checkId).toBeCalled()
		expect(mockUsersRepository.getPassword).toBeCalled()
		expect(mockUsersRepository.updatePassword).toBeCalled()
	})

	it("should fail due to not found user", async () => {

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false)),
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		const updatePasswordDto = {
			oldPassword: '1234',
			password: 'test-password',
			confirmPassword: 'test-password'
		}

		await expect(service.execute(updatePasswordDto, id)).rejects.toBeInstanceOf(NotFoundError)

	})


	it('should fail due to password and confirm password not being the same', async () => {
		const updatePasswordDto = {
			oldPassword: '1234',
			password: 'test-password',
			confirmPassword: 'test-password-different'
		}

		await expect(service.execute(updatePasswordDto, id)).rejects.toBeInstanceOf(UnprocessableEntityError)
	})

	it('should fail due to password being the same as old password', async () => {

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			getPassword: jest.fn().mockReturnValue(Promise.resolve(hashedPassword)),
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		const updatePasswordDto = {
			oldPassword: '1234',
			password: '1234',
			confirmPassword: '1234'
		}

		await expect(service.execute(updatePasswordDto, id)).rejects.toBeInstanceOf(UnprocessableEntityError)
	})

	it('should fail due to old password not being valid', async () => {

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			getPassword: jest.fn().mockReturnValue(Promise.resolve(hashedPassword)),
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		const updatePasswordDto = {
			oldPassword: '123',
			password: 'test-password',
			confirmPassword: 'test-password'
		}

		await expect(service.execute(updatePasswordDto, id)).rejects.toBeInstanceOf(BadRequestError)

	})


})
