import {v4 as uuid} from 'uuid'
import {ShowFollowersService} from '.'
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"

describe('ShowFollowersService', () => {

	let showFollowersService: ShowFollowersService
	let date: Date
	let id: string

	beforeEach(() => {
		showFollowersService = new ShowFollowersService()
		date = new Date()
		id = uuid()
	})

	it('should show user followers', async () => {

		const expectedOutput = [{
			id,
			name: 'test-name',
			user: '@test',
			email: 'test@gmail.com',
			created_at: date

		}]

		const mockUsersRepository = {
			showFollowers: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
			checkId: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		//@ts-expect-error defined part of methods
		showFollowersService['usersRepository'] = mockUsersRepository

		const result = await showFollowersService.execute('@test')

		expect(mockUsersRepository.showFollowers).toBeCalled()
		expect(result).toStrictEqual(expectedOutput)

	})

	it('should fail due to not found user', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		//@ts-expect-error defined part of methods
		showFollowersService['usersRepository'] = mockUsersRepository

		await expect(showFollowersService.execute('@test')).rejects.toThrow(NotFoundError)


	})


})


