import {INestApplication, UnprocessableEntityException} from "@nestjs/common"
import {Test, TestingModule} from "@nestjs/testing"
import {ValidateUserService} from "src/application/auth/services/ValidateUserService"
import {UnfollowService} from "src/application/users/services/UnfollowService"
import {JwtStrategy} from "src/infra/auth/strategies/jwt.strategy"
import {v4 as uuid} from 'uuid'
import {UnfollowController} from "."
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"
import {generateJwt} from "src/application/auth/utils/generate-jwt.util"
import 'dotenv/config'
import * as request from 'supertest'
import {JwtModule} from "@nestjs/jwt"
import {NotFoundInterceptor} from "src/infra/common/errors/interceptors/not-found.interceptor"
import {UnprocessableEntityInterceptor} from "src/infra/common/errors/interceptors/unprocessable-entity.interceptor"
import {UnprocessableEntityError} from "src/infra/common/errors/types/UnprocessableEntityError"


describe('Unfollow controller', () => {

	let service: UnfollowService
	let controller: UnfollowController
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
			controllers: [UnfollowController],
			providers: [{
				provide: UnfollowService,
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
		app.useGlobalInterceptors(new UnprocessableEntityInterceptor)

		controller = module.get<UnfollowController>(UnfollowController)
		service = module.get<UnfollowService>(UnfollowService)

		await app.init()

	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it('should be able to return 204', async () => {
		jest.spyOn(service, 'execute').mockReturnValueOnce(Promise.resolve())

		await request(app.getHttpServer()).patch(`/users/unfollow/${id}`).set('Authorization', `Bearer: ${token}`).expect(204)

	})

	it('should be able to return 422 exception', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new UnprocessableEntityError()})

		await request(app.getHttpServer()).patch(`/users/unfollow/${id}`).set('Authorization', `Bearer: ${token}`).expect(422)
	})

	it('should return 404 exception', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundError()})

		await request(app.getHttpServer()).patch(`/users/unfollow/${id}`).set('Authorization', `Bearer: ${token}`).expect(404)
	})

	it('should return 401 unauthorized exception', async () => {
		await request(app.getHttpServer()).patch(`/users/unfollow/${id}`).expect(401)
	})

	afterAll(() => {
		app.close()
	})
})
