import {BadRequestException, INestApplication} from "@nestjs/common"
import {Test, TestingModule} from "@nestjs/testing"
import {SignInDto} from "src/application/auth/dto/sign-in.dto"
import {SignInService} from "src/application/auth/services/SignInService"
import {SignInController} from "./sign-in.controller"
import * as request from 'supertest'
import {BadRequestInterceptor} from "src/infra/common/errors/interceptors/bad-request.interceptor"
import {BadRequestError} from "src/infra/common/errors/types/BadRequestError"

describe('SignInController', () => {
	let controller: SignInController
	let signInService: SignInService
	let app: INestApplication

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

		app = module.createNestApplication()

		app.useGlobalInterceptors(new BadRequestInterceptor)

		await app.init()
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it('should return a status of 200', async () => {
		jest.spyOn(signInService, 'execute').mockImplementationOnce(() => Promise.resolve('token'))

		const signInDto = {
			email: 'test@gmail.com',
			password: '1234'
		} as SignInDto

		await request(app.getHttpServer()).post('/auth').send(signInDto).expect(200)
	})

	it('should return a status of 400', async () => {
		jest.spyOn(signInService, 'execute').mockImplementationOnce(() => {throw new BadRequestError})

		const signInDto = {
			email: 'wrong@gmail.com',
			password: '12345'
		} as SignInDto

		await request(app.getHttpServer()).post('/auth').send(signInDto).expect(400)
	})

	afterAll(() => {
		app.close()
	})
})
