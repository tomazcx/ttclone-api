import {CheckUserNameService} from "."

describe('CheckUserNameService', () => {

	let service: CheckUserNameService

	beforeEach(() => {
		service = new CheckUserNameService()
	})

	it('should return if the user name is available or not', async () => {

		const expectedOutput = {
			user: '@test-user',
			available: false
		}

		const mockUsersRepository = {
			checkUserName: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		const result = await service.execute('@test-user')

		expect(result).toStrictEqual(expectedOutput)
	})

})
