import {AbstractShowUsersByUserName} from 'src/domain/users/services/abstract-show-users-by-user-name.service'
import {v4 as uuid} from 'uuid'
import {ShowUsersByUserNameService} from '.'

describe('ShowUsersByUserNameService', () => {

	let showUsersByUserNameService: AbstractShowUsersByUserName
	let date: Date
	let id: string

	beforeEach(() => {
		showUsersByUserNameService = new ShowUsersByUserNameService()
		date = new Date()
		id = uuid()
	})

	it('should show a user array', async () => {

		const expectedOutput = [{
			id,
			name: 'test-name',
			user: '@test',
			email: 'test@gmail.com',
			created_at: date

		}]

		const mockUsersRepository = {
			showUsersByUserName: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
		}

		showUsersByUserNameService['usersRepository'] = mockUsersRepository

		const result = await showUsersByUserNameService.execute('@test')

		expect(mockUsersRepository.showUsersByUserName).toBeCalled()
		expect(result).toStrictEqual(expectedOutput)

	})

})


