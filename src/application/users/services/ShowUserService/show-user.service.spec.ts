import {AbstractShowUser} from 'src/domain/users/services/abstract-show-user.service'
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {v4 as uuid} from 'uuid'
import {ShowUserService} from '.'

describe('ShowUserService', () => {

	let showUserService: AbstractShowUser
	let date: Date
	let id: string

	beforeEach(() => {
		showUserService = new ShowUserService()
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
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			showUser: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
		}

		showUserService['usersRepository'] = mockUsersRepository

		const result = await showUserService.execute(id)

		expect(mockUsersRepository.checkId).toBeCalled()
		expect(result).toStrictEqual(expectedOutput)

	})

	it('should fail due to not found id', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		showUserService['usersRepository'] = mockUsersRepository

		await expect(showUserService.execute(id)).rejects.toThrow(NotFoundError)

	})

})
