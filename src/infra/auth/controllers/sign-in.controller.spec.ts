import {BadRequestException} from "@nestjs/common"
import {Test, TestingModule} from "@nestjs/testing"
import {SignInDto} from "src/application/auth/dto/sign-in.dto"
import {SignInService} from "src/application/auth/services/SignInService"
import {SignInController} from "./sign-in.controller"

describe('SignInController', () => {
	let controller: SignInController
	let signInService: SignInService

	beforeEach(async () => {

		const module: TestingModule = await Test.createTestingModule({
			controllers: [SignInController],
			providers: [
				{
					provide: SignInService,
					useValue: {
						execute: jest.fn(x => x)
					}
				}
			]
		}).compile()

		controller = module.get<SignInController>(SignInController)
		signInService = module.get<SignInService>(SignInService)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it('should return a status of 200', async () => {
		jest.spyOn(signInService, 'execute').mockImplementationOnce(() => Promise.resolve('token'))

		const requestMock = {
			email: 'wrong-email',
			password: 'wrong-password'
		} as SignInDto

		const result = await controller.handle(requestMock)

		expect(result.status).toBe('Authenticated')

	})

	it('should return a status of 400', async () => {

		jest.spyOn(signInService, 'execute').mockImplementationOnce(() => {throw new BadRequestException})

		const requestMock = {
			email: 'wrong-email',
			password: 'wrong-password'
		} as SignInDto

		await expect(controller.handle(requestMock)
		).rejects.toBeInstanceOf(BadRequestException)
	})
})
