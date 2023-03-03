import {NotFoundException} from "@nestjs/common"
import {Test, TestingModule} from "@nestjs/testing"
import {UpdateBannerService} from "src/application/users/services/UpdateBannerService"
import {User} from "src/domain/users/entities/User"
import {UpdateBannerController} from "."
import {v4 as uuid} from 'uuid'

describe('UpdateBannerController', () => {

	let controller: UpdateBannerController
	let service: UpdateBannerService
	let req: any
	const file = {} as Express.Multer.File

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UpdateBannerController],
			providers: [{
				provide: UpdateBannerService,
				useValue: {
					execute: (x => x)
				}
			}]
		}).compile()

		controller = module.get<UpdateBannerController>(UpdateBannerController)
		service = module.get<UpdateBannerService>(UpdateBannerService)
		req = {user: uuid()}
		file.filename = 'test.jpg'
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it("should update the user's banner", async () => {

		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve({} as User))

		await expect(controller.handle(file, req)).resolves.toBeTruthy()
	})

	it('should throw a not found exception', async () => {

		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundException})

		await expect(controller.handle(file, req)).rejects.toBeInstanceOf(NotFoundException)
	})

})

