import {Test, TestingModule} from "@nestjs/testing"
import {FollowService} from "src/application/users/services/FollowService"
import {FollowController} from "."
import {v4 as uuid} from 'uuid'
import {UnprocessableEntityException} from "@nestjs/common"

describe('FollowController', () => {

	let followController: FollowController
	let followService: FollowService
	let id: string
	let req: {user: string}

	beforeEach(async () => {

		const module: TestingModule = await Test.createTestingModule({
			providers: [{
				provide: FollowService,
				useValue: {
					execute: (x => x)
				}
			}],
			controllers: [FollowController]
		}).compile()

		followController = module.get<FollowController>(FollowController)
		followService = module.get<FollowService>(FollowService)
		id = uuid()
		req = {user: uuid()}
	})

	it('should be defined', () => {
		expect(followController).toBeDefined()
	})

	it('should be able to return 204', async () => {
		jest.spyOn(followService, 'execute').mockReturnValueOnce(Promise.resolve())

		await followController.handle(id, req)

		expect(followService.execute).toBeCalled()
	})

	it('should be able to throw unprocessable entity exception', async () => {
		jest.spyOn(followService, 'execute').mockImplementationOnce(() => {throw new UnprocessableEntityException()})

		await expect(followController.handle(id, req)).rejects.toBeInstanceOf(UnprocessableEntityException)
	})

})
