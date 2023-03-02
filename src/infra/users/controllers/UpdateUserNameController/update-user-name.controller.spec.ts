import {Test, TestingModule} from "@nestjs/testing"
import {User} from "src/domain/users/entities/User"
import {UpdateUserNameService} from "src/application/users/services/UpdateUserNameService"
import {v4 as uuid} from 'uuid'
import {BadRequestException, NotFoundException} from "@nestjs/common"
import {UpdateUserNameController} from "."

describe('UpdateUserNameController', () => {

	let controller: UpdateUserNameController
	let service: UpdateUserNameService
	let req: any

	beforeEach(async () => {

		const module: TestingModule = await Test.createTestingModule({
			controllers: [UpdateUserNameController],
			providers: [{
				provide: UpdateUserNameService,
				useValue: {
					execute: x => x
				}
			}]
		}).compile()

		controller = module.get<UpdateUserNameController>(UpdateUserNameController)
		service = module.get<UpdateUserNameService>(UpdateUserNameService)

		req = {user: uuid()}
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it('should update user name', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve({} as User))

		const updateUserNameDto = {
			user: '@updated'
		}

		const result = await controller.handle(updateUserNameDto, req)

		expect(service.execute).toBeCalled()
	})

	it('should throw bad request', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundException})

		const updateUserNameDto = {
			user: '@updated'
		}

		await expect(controller.handle(updateUserNameDto, req)).rejects.toBeInstanceOf(NotFoundException)
		expect(service.execute).toBeCalled()

	})

	it('should throw bad request', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new BadRequestException})

		const updateUserNameDto = {
			user: '@updated'
		}

		await expect(controller.handle(updateUserNameDto, req)).rejects.toBeInstanceOf(BadRequestException)
		expect(service.execute).toBeCalled()

	})

})
