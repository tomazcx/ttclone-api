import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {v4 as uuid} from 'uuid'
import {UpdateBannerService} from '.'
import * as fs from 'fs'
import {AbstractUpdateBanner} from 'src/domain/users/services/abstract-update-banner.service'

describe('UpdateBannerService', () => {

	let service: AbstractUpdateBanner
	let id: string

	beforeEach(() => {
		service = new UpdateBannerService()
		id = uuid()
	})

	it("should update the user's banner", async () => {
		//create banner to be deleted
		fs.writeFileSync('temp/uploads/banner.jpg', "")

		const userToReturn = {
			id,
			name: 'updated-name',
			email: 'test@email.com',
			user: '@test',
			banner: 'banner.jpg'
		}

		const expectedOutput = {
			id,
			name: 'updated-name',
			email: 'test@email.com',
			user: '@test',
			banner: 'test.jpg'
		}

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			showUser: jest.fn().mockReturnValue(Promise.resolve(userToReturn)),
			updateBanner: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
		}

		service['usersRepository'] = mockUsersRepository

		const result = await service.execute('test.jpg', id)

		expect(result).toStrictEqual(expectedOutput)
		expect(mockUsersRepository.checkId).toBeCalled()
		expect(mockUsersRepository.updateBanner).toBeCalled()
		expect(fs.existsSync('temp/uploads/banner.jpg')).toBe(false)
	})

	it("should fail due to not found user", async () => {

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false)),
		}

		service['usersRepository'] = mockUsersRepository

		await expect(service.execute('test.jpg', id)).rejects.toBeInstanceOf(NotFoundError)

	})


})
