import {Test, TestingModule} from "@nestjs/testing"
import {CheckUserNameService} from "src/application/users/services/CheckUserNameService"
import {CheckUserNameController} from "."

describe('CheckUserNameController', () => {

	let controller: CheckUserNameController
	let service: CheckUserNameService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CheckUserNameController],
			providers: [{
				provide: CheckUserNameService,
				useValue: {
					execute: x => x
				}
			}]
		}).compile()

		controller = module.get<CheckUserNameController>(CheckUserNameController)
		service = module.get<CheckUserNameService>(CheckUserNameService)
	})

	it('should check the user name', async () => {

		const expectedOutput = {
			user: 'user',
			available: false
		}

		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve(expectedOutput))

		const result = await controller.handle('user')

		expect(result).toStrictEqual(expectedOutput)
		expect(service.execute).toBeCalled()

	})

})
