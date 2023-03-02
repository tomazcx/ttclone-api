import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {User} from 'src/domain/users/entities/User'
import {v4 as uuid} from 'uuid'
import {DeleteUserService} from '.'

describe('DeleteUserService', () => {

	let service: DeleteUserService
	let id: string

	beforeEach(() => {
		service = new DeleteUserService()
		id = uuid()
	})

	it('should delete a user with the informed id', async () => {

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(true),
			deleteUser: jest.fn().mockReturnValue(Promise.resolve())
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		await service.execute(id)

		expect(mockUsersRepository.checkId).toBeCalled()
		expect(mockUsersRepository.deleteUser).toBeCalled()
	})

	it('should fail due to not found user', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(false),
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		await expect(service.execute(id)).rejects.toBeInstanceOf(NotFoundError)

	})

})
