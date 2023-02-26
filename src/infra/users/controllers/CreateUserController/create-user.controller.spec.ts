import {BadRequestException} from "@nestjs/common"
import {Test, TestingModule} from "@nestjs/testing"
import {CreateUserService} from "src/application/users/services/CreateUserService"
import {User} from "src/domain/users/entities/User"
import {CreateUserController} from "."

describe('CreateUserController', () => {

	let controller: CreateUserController
	let createUserService: CreateUserService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CreateUserController],
			providers: [{
				provide: CreateUserService,
				useValue: {
					execute: (x => x)
				}
			}]
		}).compile()

		controller = module.get<CreateUserController>(CreateUserController)
		createUserService = module.get<CreateUserService>(CreateUserService)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it('should create a user', async () => {

		const createUserDto = {
			name: 'test-name',
			email: 'test@email.com',
			password: '1234',
			confirmPassword: '1234',
			user: '@user'
		}

		jest.spyOn(createUserService, 'execute').mockImplementationOnce(() => Promise.resolve({} as User))

		await expect(controller.handle(createUserDto)).resolves.toBeTruthy()
	})

	it('should throw a bad request expection', async () => {
		const createUserDto = {
			name: 'test-name',
			email: 'registered@email.com',
			password: '1234',
			confirmPassword: '1234',
			user: '@user'
		}

		jest.spyOn(createUserService, 'execute').mockImplementationOnce(() => {throw new BadRequestException})

		await expect(controller.handle(createUserDto)).rejects.toBeInstanceOf(BadRequestException)
	})

})
