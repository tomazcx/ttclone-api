import {AbstractShowUserByUserName} from 'src/domain/users/services/abstract-show-user-by-user-name.service'
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {v4 as uuid} from 'uuid'
import {ShowUserByUserNameService} from '.'

describe('ShowUserByUserNameService', () => {

	let showUserService: AbstractShowUserByUserName
	let date: Date
	let id: string

	beforeEach(() => {
		showUserService = new ShowUserByUserNameService()
		date = new Date()
		id = uuid()
	})

	it('should show user data', async () => {
		const expectedOutput = {
			id,
			name: 'test-name',
			user: '@test',
			email: 'test@gmail.com',
			created_at: date

		}

		const mockUsersRepository = {
			checkUserName: jest.fn().mockReturnValue(Promise.resolve(true)),
			showUserByUserName: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
		}

		showUserService['usersRepository'] = mockUsersRepository

		const result = await showUserService.execute('@user')

		expect(mockUsersRepository.checkUserName).toBeCalled()
		expect(result).toStrictEqual(expectedOutput)

	})

	it('should fail due to not found user', async () => {
		const mockUsersRepository = {
			checkUserName: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		showUserService['usersRepository'] = mockUsersRepository

		await expect(showUserService.execute('@utest')).rejects.toThrow(NotFoundError)

	})

})
