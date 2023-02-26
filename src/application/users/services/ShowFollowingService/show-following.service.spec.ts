import {v4 as uuid} from 'uuid'
import {ShowFollowingService} from '.'
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"

describe('ShowFollowingService', () => {

	let showFollowingService: ShowFollowingService
	let date: Date
	let id: string

	beforeEach(() => {
		showFollowingService = new ShowFollowingService()
		date = new Date()
		id = uuid()
	})

	it('should show create a new user', async () => {

		const expectedOutput = [{
			id,
			name: 'test-name',
			user: '@test',
			email: 'test@gmail.com',
			created_at: date

		}]

		const mockUsersRepository = {
			showFollowing: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
			showUser: jest.fn().mockReturnValue(Promise.resolve(expectedOutput[0]))
		}

		//@ts-expect-error defined part of methods
		showFollowingService['usersRepository'] = mockUsersRepository

		const result = await showFollowingService.execute('@test')

		expect(mockUsersRepository.showFollowing).toBeCalled()
		expect(result).toStrictEqual(expectedOutput)

	})

	it('should fail due to not found user', async () => {
		const mockUsersRepository = {
			showUser: jest.fn().mockReturnValue(Promise.resolve(undefined))
		}

		//@ts-expect-error defined part of methods
		showFollowingService['usersRepository'] = mockUsersRepository

		await expect(showFollowingService.execute('@test')).rejects.toThrow(NotFoundError)


	})


})

