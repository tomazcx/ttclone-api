import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {v4 as uuid} from 'uuid'
import {UpdateProfileService} from '.'

describe('UpdateProfileService', () => {

	let service: UpdateProfileService
	let id: string

	beforeEach(() => {
		service = new UpdateProfileService()
		id = uuid()
	})

	it("should update the profile of the user with the informed id", async () => {
		const expectedOutput = {
			id,
			name: 'updated-name',
			email: 'test@email.com',
			user: '@test',
			desc: 'test-desc',
			localization: 'test-localization'
		}

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(true)),
			updateProfile: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		const updateProfileDto = {
			name: 'updated-name',
			desc: 'test-desc',
			localization: 'test-localization'
		}

		const result = await service.execute(updateProfileDto, id)

		expect(result).toStrictEqual(expectedOutput)
		expect(mockUsersRepository.checkId).toBeCalled()
		expect(mockUsersRepository.updateProfile).toBeCalled()
	})

	it("should fail due to not found user", async () => {

		const mockUsersRepository = {
			checkId: jest.fn().mockReturnValue(Promise.resolve(false)),
		}

		//@ts-expect-error defined part of methods
		service['usersRepository'] = mockUsersRepository

		const updateProfileDto = {
			name: 'updated-name',
			desc: 'test-desc',
			localization: 'test-localization'
		}

		await expect(service.execute(updateProfileDto, id)).rejects.toBeInstanceOf(NotFoundError)


	})


})
