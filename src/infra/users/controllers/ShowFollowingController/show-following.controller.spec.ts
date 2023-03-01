import {Test, TestingModule} from "@nestjs/testing"
import {User} from "src/domain/users/entities/User"
import {ShowFollowingService} from "src/application/users/services/ShowFollowingService"
import {ShowFollowingController} from "."
import {v4 as uuid} from 'uuid'

describe('ShowFollowingController', () => {

	let showFollowingController: ShowFollowingController
	let showFollowingService: ShowFollowingService
	let id: string

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: ShowFollowingService,
					useValue: {
						execute: (x => x)
					}
				}
			],
			controllers: [ShowFollowingController]
		}).compile()

		showFollowingController = module.get<ShowFollowingController>(ShowFollowingController)
		showFollowingService = module.get<ShowFollowingService>(ShowFollowingService)
		id = uuid()
	})

	it('should be defined', () => {
		expect(showFollowingController).toBeDefined()
	})

	it('should return status of 200', async () => {
		jest.spyOn(showFollowingService, 'execute').mockImplementationOnce(() => Promise.resolve([] as User[]))

		await showFollowingController.handle(id)

		expect(showFollowingService.execute).toBeCalled()
	})



})
