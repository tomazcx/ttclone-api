import {Test, TestingModule} from "@nestjs/testing"
import {User} from "src/domain/users/entities/User"
import {ShowFollowersService} from "src/application/users/services/ShowFollowersService"
import {ShowFollowersController} from "."
import {v4 as uuid} from 'uuid'

describe('ShowFollowersController', () => {

	let showFollowersController: ShowFollowersController
	let showFollowersService: ShowFollowersService
	let id: string

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: ShowFollowersService,
					useValue: {
						execute: (x => x)
					}
				}
			],
			controllers: [ShowFollowersController]
		}).compile()

		showFollowersController = module.get<ShowFollowersController>(ShowFollowersController)
		showFollowersService = module.get<ShowFollowersService>(ShowFollowersService)
		id = uuid()
	})

	it('should be defined', () => {
		expect(showFollowersController).toBeDefined()
	})

	it('should return status of 200', async () => {
		jest.spyOn(showFollowersService, 'execute').mockImplementationOnce(() => Promise.resolve([] as User[]))

		await showFollowersController.handle(id)

		expect(showFollowersService.execute).toBeCalled()
	})



})
