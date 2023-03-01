import {ValidateUserService} from "."
import {v4 as uuid} from 'uuid'
import {NotFoundException} from "@nestjs/common"

describe('ValidateUserService', () => {

	let validateUserService: ValidateUserService
	let id: string

	beforeEach(() => {
		validateUserService = new ValidateUserService()
		id = uuid()
	})

	it('should validate the user', async () => {

		const expectedOutput = {
			id,
			name: 'test-name',
			email: "test@email.com",
			created_at: new Date(),
			user: '@test'
		}

		const mockAuthRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
		}

		//@ts-expect-error defined part of methods
		validateUserService['authRepository'] = mockAuthRepository

		const user = await validateUserService.execute(id)

		expect(mockAuthRepository.checkId).toBeCalled()
		expect(user).toStrictEqual(expectedOutput)

	})

	it("should throw a exception due to not found id", async () => {
		const mockAuthRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(undefined))
		}

		//@ts-expect-error defined part of methods
		validateUserService['authRepository'] = mockAuthRepository

		await expect(validateUserService.execute(id)).rejects.toBeInstanceOf(NotFoundException)

	})

})
