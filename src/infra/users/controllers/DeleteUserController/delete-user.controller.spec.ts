import {INestApplication, NotFoundException} from "@nestjs/common"
import {JwtModule} from "@nestjs/jwt"
import {Test, TestingModule} from "@nestjs/testing"
import {DeleteUserService} from "src/application/users/services/DeleteUserService"
import {NotFoundInterceptor} from "src/infra/common/errors/interceptors/not-found.interceptor"
import {v4 as uuid} from 'uuid'
import {DeleteUserController} from "."
import 'dotenv/config'
import {ValidateUserService} from "src/application/auth/services/ValidateUserService"
import {JwtStrategy} from "src/infra/auth/strategies/jwt.strategy"
import * as request from 'supertest'
import {generateJwt} from "src/application/auth/utils/generate-jwt.util"
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"

describe('DeleteUserController', () => {

	let controller: DeleteUserController
	let service: DeleteUserService
	let app: INestApplication
	let id: string
	let token: string

	beforeEach(async () => {

		id = uuid()

		const module: TestingModule = await Test.createTestingModule({
			imports: [
				JwtModule.register({
					secret: process.env.JWT_SECRET,
					signOptions: {
						expiresIn: process.env.JWT_EXPIRES_IN
					}
				})
			],
			controllers: [DeleteUserController],
			providers: [{
				provide: DeleteUserService,
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


		token = generateJwt(id)

		controller = module.get<DeleteUserController>(DeleteUserController)
		service = module.get<DeleteUserService>(DeleteUserService)

		app = module.createNestApplication()

		app.useGlobalInterceptors(new NotFoundInterceptor)

		await app.init()
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it('should return 204', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve())

		await request(app.getHttpServer()).delete('/users').set('Authorization', `Bearer: ${token}`).expect(204)

	})

	it('should return 404, not found user', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundError})

		await request(app.getHttpServer()).delete('/users').set('Authorization', `Bearer: ${token}`).expect(404)
	})

	it('should return 401 unauthorized exception', async () => {
		await request(app.getHttpServer()).delete('/users').expect(401)
	})

	afterAll(() => {
		app.close()
	})

})
