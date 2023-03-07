import {INestApplication} from "@nestjs/common"
import {Test, TestingModule} from "@nestjs/testing"
import {User} from "src/domain/users/entities/User"
import {CreateUserController} from "."
import * as request from 'supertest'
import {BadRequestError} from "src/infra/common/errors/types/BadRequestError"
import {BadRequestInterceptor} from "src/infra/common/errors/interceptors/bad-request.interceptor"
import {AbstractCreateUser} from "src/domain/users/services/abstract-create-user.service"

describe('CreateUserController', () => {

	let controller: CreateUserController
	let createUserService: AbstractCreateUser
	let app: INestApplication

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CreateUserController],
			providers: [{
				provide: AbstractCreateUser,
				useValue: {
					execute: (x => x)
				}
			}]
		}).compile()

		controller = module.get<CreateUserController>(CreateUserController)
		createUserService = module.get<AbstractCreateUser>(AbstractCreateUser)

		app = module.createNestApplication()

		app.useGlobalInterceptors(new BadRequestInterceptor)

		await app.init()

	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it('should return status 201', async () => {

		const createUserDto = {
			name: 'test-name',
			email: 'test@email.com',
			password: '1234',
			confirmPassword: '1234',
			user: '@user'
		}

		jest.spyOn(createUserService, 'execute').mockImplementationOnce(() => Promise.resolve({} as User))

		await request(app.getHttpServer()).post('/users').send(createUserDto).expect(201)
	})

	it('should throw a 400 exception', async () => {
		const createUserDto = {
			name: 'test-name',
			email: 'registered@email.com',
			password: '1234',
			confirmPassword: '1234',
			user: '@user'
		}

		jest.spyOn(createUserService, 'execute').mockImplementationOnce(() => {throw new BadRequestError})

		await request(app.getHttpServer()).post('/users').send(createUserDto).expect(400)
	})

	afterAll(() => {
		app.close()
	})
})
