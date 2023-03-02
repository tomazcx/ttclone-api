import {UnprocessableEntityException} from "@nestjs/common"
import {Test, TestingModule} from "@nestjs/testing"
import {UnfollowService} from "src/application/users/services/UnfollowService"
import {v4 as uuid} from 'uuid'
import {UnfollowController} from "."

describe('Unfollow controller', () => {

	let service: UnfollowService
	let controller: UnfollowController
	let userToUnfollowId: string
	let req: {user: string}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UnfollowController],
			providers: [{
				provide: UnfollowService,
				useValue: {
					execute: x => x
				}
			}]
		}).compile()

		controller = module.get<UnfollowController>(UnfollowController)
		service = module.get<UnfollowService>(UnfollowService)

		userToUnfollowId = uuid()
		req = {user: uuid()}
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it('should unfollow', async () => {

		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve())

		await controller.handle(userToUnfollowId, req)

		expect(service.execute).toBeCalled()
	})

	it('should be able to throw unprocessable entity exception', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new UnprocessableEntityException()})

		await expect(controller.handle(userToUnfollowId, req)).rejects.toBeInstanceOf(UnprocessableEntityException)
	})
})
