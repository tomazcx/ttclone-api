import {BadRequestException, INestApplication, NotFoundException, UnprocessableEntityException} from "@nestjs/common"
import {Test, TestingModule} from "@nestjs/testing"
import {UpdatePasswordService} from "src/application/users/services/UpdatePasswordService"
import {User} from "src/domain/users/entities/User"
import {UpdatePasswordController} from "."
import * as request from 'supertest'
import 'dotenv/config'
import {v4 as uuid} from 'uuid'
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"
import {JwtModule} from "@nestjs/jwt"
import {ValidateUserService} from "src/application/auth/services/ValidateUserService"
import {JwtStrategy} from "src/infra/auth/strategies/jwt.strategy"
import {generateJwt} from "src/application/auth/utils/generate-jwt.util"
import {BadRequestError} from "src/infra/common/errors/types/BadRequestError"
import {NotFoundInterceptor} from "src/infra/common/errors/interceptors/not-found.interceptor"
import {BadRequestInterceptor} from "src/infra/common/errors/interceptors/bad-request.interceptor"
import {UnprocessableEntityInterceptor} from "src/infra/common/errors/interceptors/unprocessable-entity.interceptor"


describe('UpdatePasswordController', () => {

	let controller: UpdatePasswordController
	let service: UpdatePasswordService
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
			controllers: [UpdatePasswordController],
			providers: [
				{
					provide: UpdatePasswordService,
					useValue: {
						execute: (x => x)
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
		app.useGlobalInterceptors(new UnprocessableEntityInterceptor)

		controller = module.get<UpdatePasswordController>(UpdatePasswordController)
		service = module.get<UpdatePasswordService>(UpdatePasswordService)

		await app.init()
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it("should return 200", async () => {

		const updatePasswordDto = {
			oldPassword: '1234',
			password: 'test-password',
			confirmPassword: 'test-password'
		}

		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve({} as User))

		await request(app.getHttpServer()).patch("/users/password").send(updatePasswordDto).set('Authorization', `Bearer: ${token}`).expect(200)
	})

	it('should throw a 404', async () => {
		const updatePasswordDto = {
			oldPassword: '1234',
			password: 'test-password',
			confirmPassword: 'test-password'
		}

		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundError})

		await request(app.getHttpServer()).patch("/users/password").send(updatePasswordDto).set('Authorization', `Bearer: ${token}`).expect(404)
	})

	it('should throw a bad request exception', async () => {
		const updatePasswordDto = {
			oldPassword: '1234',
			password: 'test-password',
			confirmPassword: 'test-password'
		}

		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new BadRequestError})

		await request(app.getHttpServer()).patch("/users/password").send(updatePasswordDto).set('Authorization', `Bearer: ${token}`).expect(400)
	})

	it('should throw a unprocessable entity exception', async () => {
		const updatePasswordDto = {
			oldPassword: '1234',
			password: 'test-password',
			confirmPassword: 'test-password'
		}

		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new UnprocessableEntityException})

		await request(app.getHttpServer()).patch("/users/password").send(updatePasswordDto).set('Authorization', `Bearer: ${token}`).expect(422)
	})

	it('should throw a 401 unauthorized exception', async () => {
		await request(app.getHttpServer()).patch('/users/password').expect(401)
	})


	afterAll(() => {
		app.close()
	})

})

