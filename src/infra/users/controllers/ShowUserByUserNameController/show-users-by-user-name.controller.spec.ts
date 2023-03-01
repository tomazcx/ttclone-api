import {Test, TestingModule} from "@nestjs/testing"
import {ShowUsersByUserNameService} from "src/application/users/services/ShowUsersByUserNameService"
import {ShowUsersByUserNameController} from "."
import {v4 as uuid} from 'uuid'

describe("ShowUserByUserNameController", () => {

	let controller: ShowUsersByUserNameController
	let service: ShowUsersByUserNameService
	let id: string

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ShowUsersByUserNameController],
			providers: [{
				provide: ShowUsersByUserNameService,
				useValue: {
					execute: (x => x)
				}
			}]
		}).compile()

		controller = module.get<ShowUsersByUserNameController>(ShowUsersByUserNameController)
		service = module.get<ShowUsersByUserNameService>(ShowUsersByUserNameService)
		id = uuid()
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it('should return profiles that matches the user string', async () => {

		const expectedOutput = [{
			id,
			name: 'test-name',
			email: 'test-email',
			created_at: new Date(),
			user: '@user'
		}]

		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve(expectedOutput))

		const result = await controller.handle('us')

		expect(result).toStrictEqual(expectedOutput)
	})


})
