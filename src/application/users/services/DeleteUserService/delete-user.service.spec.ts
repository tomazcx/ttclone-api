import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {v4 as uuid} from 'uuid'
import {DeleteUserService} from '.'
import * as fs from 'fs'

describe('DeleteUserService', () => {

	let service: DeleteUserService
	let id: string

	beforeEach(() => {
		service = new DeleteUserService()
		id = uuid()
	})

	it('should delete a user with the informed id and its image and banner', async () => {

		//create images to be deleted
		fs.writeFileSync('temp/uploads/test.jpg', '')
		fs.writeFileSync('temp/uploads/test-banner.jpg', '')

		const userData = {
			id,
			name: 'test-name',
			desc: 'test-desc',
			user: '@test',
			email: 'test@email.com',
			image: 'test.jpg',
			banner: 'test-banner.jpg',
			created_at: new Date()
		}

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			showUser: jest.fn().mockReturnValue(Promise.resolve(userData)),
			deleteUser: jest.fn().mockReturnValue(Promise.resolve())
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		await service.execute(id)

		expect(mockUsersRepository.checkId).toBeCalled()
		expect(mockUsersRepository.deleteUser).toBeCalled()
		expect(fs.existsSync('temp/uploads/test-banner.jpg')).toBe(false)
		expect(fs.existsSync('temp/uploads/test.jpg')).toBe(false)
	})

	it('should fail due to not found user', async () => {
		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false)),
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		await expect(service.execute(id)).rejects.toBeInstanceOf(NotFoundError)

	})

})
