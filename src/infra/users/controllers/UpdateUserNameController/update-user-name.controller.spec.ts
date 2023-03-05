import {Test, TestingModule} from "@nestjs/testing"
import {User} from "src/domain/users/entities/User"
import {UpdateUserNameService} from "src/application/users/services/UpdateUserNameService"
import {v4 as uuid} from 'uuid'
import {BadRequestException, INestApplication, NotFoundException} from "@nestjs/common"
import {UpdateUserNameController} from "."
import 'dotenv/config'
import {JwtModule} from "@nestjs/jwt"
import * as request from 'supertest'
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"
import {generateJwt} from "src/application/auth/utils/generate-jwt.util"
import {ValidateUserService} from "src/application/auth/services/ValidateUserService"
import {JwtStrategy} from "src/infra/auth/strategies/jwt.strategy"
import {NotFoundInterceptor} from "src/infra/common/errors/interceptors/not-found.interceptor"
import {BadRequestInterceptor} from "src/infra/common/errors/interceptors/bad-request.interceptor"
import {BadRequestError} from "src/infra/common/errors/types/BadRequestError"


describe('UpdateUserNameController', () => {

	let controller: UpdateUserNameController
	let service: UpdateUserNameService
	let app: INestApplication
	let id: string
	let token: string

	beforeEach(async () => {

		id = uuid()
		token = generateJwt(id)

		const module: TestingModule = await Test.createTestingModule({
			imports: [
				JwtModule.register({
					secret: process.env.JWT_SECRET,
					signOptions: {
						expiresIn: process.env.JWT_EXPIRES_IN
					}
				})
			],
			controllers: [UpdateUserNameController],
			providers: [
				{
					provide: UpdateUserNameService,
					useValue: {
						execute: x => x
					}
				},
				{
					provide: ValidateUserService,
					useValue: {
						execute: () => Promise.resolve({id})
					}
				},
				JwtStrategy
			]
		}).compile()

		app = module.createNestApplication()
		app.useGlobalInterceptors(new NotFoundInterceptor)
		app.useGlobalInterceptors(new BadRequestInterceptor)

		controller = module.get<UpdateUserNameController>(UpdateUserNameController)
		service = module.get<UpdateUserNameService>(UpdateUserNameService)

		await app.init()


	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it('should update user name', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve({} as User))

		const updateUserNameDto = {
			user: '@updated'
		}

		await request(app.getHttpServer()).patch('/users/user').send(updateUserNameDto).set('Authorization', `Bearer: ${token}`).expect(200)
	})
	it('should throw 404 exception', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundError})

		const updateUserNameDto = {
			user: '@updated'
		}

		await request(app.getHttpServer()).patch('/users/user').send(updateUserNameDto).set('Authorization', `Bearer: ${token}`).expect(404)
	})

	it('should throw 400 exception', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new BadRequestError})

		const updateUserNameDto = {
			user: '@updated'
		}

		await request(app.getHttpServer()).patch('/users/user').send(updateUserNameDto).set('Authorization', `Bearer: ${token}`).expect(400)
	})

	it('should throw a 401 unauthorized exception', async () => {
		await request(app.getHttpServer()).patch('/users/user').expect(401)
	})


	afterAll(() => {
		app.close()
	})


})
