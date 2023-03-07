import {v4 as uuid} from 'uuid'
import {ShowFollowingService} from '.'
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"
import {AbstractShowFollowing} from 'src/domain/users/services/abstract-show-following.service'

describe('ShowFollowingService', () => {

	let showFollowingService: AbstractShowFollowing
	let date: Date
	let id: string

	beforeEach(() => {
		showFollowingService = new ShowFollowingService()
		date = new Date()
		id = uuid()
	})

	it('should show users that is following', async () => {

		const expectedOutput = [{
			id,
			name: 'test-name',
			user: '@test',
			email: 'test@gmail.com',
			created_at: date

		}]

		const mockUsersRepository = {
			showFollowing: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
			checkId: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		showFollowingService['usersRepository'] = mockUsersRepository

		const result = await showFollowingService.execute('@test')

		expect(mockUsersRepository.showFollowing).toBeCalled()
		expect(result).toStrictEqual(expectedOutput)

	})

	it('should fail due to not found user', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		showFollowingService['usersRepository'] = mockUsersRepository

		await expect(showFollowingService.execute('@test')).rejects.toThrow(NotFoundError)


	})


})


