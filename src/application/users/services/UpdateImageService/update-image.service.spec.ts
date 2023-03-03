import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {v4 as uuid} from 'uuid'
import {UpdateImageService} from '.'
import * as fs from 'fs'

describe('UpdateImageService', () => {

	let service: UpdateImageService
	let id: string

	beforeEach(() => {
		service = new UpdateImageService()
		id = uuid()
	})

	it("should update the user's image", async () => {
		//create image to be deleted
		fs.writeFileSync('temp/uploads/image.jpg', "")

		const userToReturn = {
			id,
			name: 'updated-name',
			email: 'test@email.com',
			user: '@test',
			image: 'image.jpg'
		}

		const expectedOutput = {
			id,
			name: 'updated-name',
			email: 'test@email.com',
			user: '@test',
			image: 'test.jpg'
		}

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			showUser: jest.fn().mockReturnValue(Promise.resolve(userToReturn)),
			updateImage: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		const result = await service.execute('test.jpg', id)

		expect(result).toStrictEqual(expectedOutput)
		expect(mockUsersRepository.checkId).toBeCalled()
		expect(mockUsersRepository.updateImage).toBeCalled()
		expect(fs.existsSync('temp/uploads/image.jpg')).toBe(false)
	})

	it("should fail due to not found user", async () => {

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false)),
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		await expect(service.execute('test.jpg', id)).rejects.toBeInstanceOf(NotFoundError)


	})


})
