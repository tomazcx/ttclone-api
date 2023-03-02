import {NotFoundException} from "@nestjs/common"
import {Test, TestingModule} from "@nestjs/testing"
import {DeleteUserService} from "src/application/users/services/DeleteUserService"
import {v4 as uuid} from 'uuid'
import {DeleteUserController} from "."

describe('DeleteUserController', () => {

	let controller: DeleteUserController
	let service: DeleteUserService
	let req: any

	beforeEach(async () => {

		const module: TestingModule = await Test.createTestingModule({
			controllers: [DeleteUserController],
			providers: [{
				provide: DeleteUserService,
				useValue: {
					execute: x => x
				}
			}]
		}).compile()

		controller = module.get<DeleteUserController>(DeleteUserController)
		service = module.get<DeleteUserService>(DeleteUserService)

		req = {user: uuid()}
	})

	it('should delete user', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve())

		await controller.handle(req)

		expect(service.execute).toBeCalled()
	})

	it('should throw a not found exception', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundException})

		await expect(controller.handle(req)).rejects.toBeInstanceOf(NotFoundException)

	})

})
