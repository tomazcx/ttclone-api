import {NotFoundException} from "@nestjs/common"
import {Test, TestingModule} from "@nestjs/testing"
import {UpdateImageService} from "src/application/users/services/UpdateImageService"
import {User} from "src/domain/users/entities/User"
import {UpdateImageController} from "."
import {v4 as uuid} from 'uuid'

describe('UpdateImageController', () => {

	let controller: UpdateImageController
	let service: UpdateImageService
	let req: any
	const file = {} as Express.Multer.File

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UpdateImageController],
			providers: [{
				provide: UpdateImageService,
				useValue: {
					execute: (x => x)
				}
			}]
		}).compile()

		controller = module.get<UpdateImageController>(UpdateImageController)
		service = module.get<UpdateImageService>(UpdateImageService)
		req = {user: uuid()}
		file.filename = 'test.jpg'
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it("should update the user's image", async () => {

		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve({} as User))

		await expect(controller.handle(file, req)).resolves.toBeTruthy()
	})

	it('should throw a not found exception', async () => {

		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundException})

		await expect(controller.handle(file, req)).rejects.toBeInstanceOf(NotFoundException)
	})

})

