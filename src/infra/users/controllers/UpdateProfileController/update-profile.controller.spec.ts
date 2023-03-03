import {NotFoundException} from "@nestjs/common"
import {Test, TestingModule} from "@nestjs/testing"
import {UpdateProfileService} from "src/application/users/services/UpdateProfileService"
import {User} from "src/domain/users/entities/User"
import {UpdateProfileController} from "."
import {v4 as uuid} from 'uuid'

describe('UpdateProfileController', () => {

	let controller: UpdateProfileController
	let service: UpdateProfileService
	let req: any

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UpdateProfileController],
			providers: [{
				provide: UpdateProfileService,
				useValue: {
					execute: (x => x)
				}
			}]
		}).compile()

		controller = module.get<UpdateProfileController>(UpdateProfileController)
		service = module.get<UpdateProfileService>(UpdateProfileService)
		req = {user: uuid()}
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it("should update the user's profile", async () => {

		const updateProfileDto = {
			name: 'test-name',
			desc: 'test-desc',
			localization: 'test-localization'
		}

		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve({} as User))

		await expect(controller.handle(updateProfileDto, req)).resolves.toBeTruthy()
	})

	it('should throw a not found exception', async () => {
		const updateProfileDto = {
			name: 'test-name',
			desc: 'test-desc',
			localization: 'test-localization'
		}

		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundException})

		await expect(controller.handle(updateProfileDto, req)).rejects.toBeInstanceOf(NotFoundException)
	})

})

