import {Test, TestingModule} from "@nestjs/testing"
import {FollowController} from "."
import {v4 as uuid} from 'uuid'
import {INestApplication} from "@nestjs/common"
import {JwtModule} from "@nestjs/jwt"
import 'dotenv/config'
import * as request from 'supertest'
import {ValidateUserService} from "src/application/auth/services/ValidateUserService"
import {JwtStrategy} from "src/infra/auth/strategies/jwt.strategy"
import {NotFoundInterceptor} from "src/infra/common/errors/interceptors/not-found.interceptor"
import {UnprocessableEntityError} from "src/infra/common/errors/types/UnprocessableEntityError"
import {UnprocessableEntityInterceptor} from "src/infra/common/errors/interceptors/unprocessable-entity.interceptor"
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"
import {generateJwt} from "src/application/auth/utils/generate-jwt.util"
import {AbstractFollow} from "src/domain/users/services/abstract-follow.service"

describe('FollowController', () => {

	let followController: FollowController
	let followService: AbstractFollow
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
			providers: [{
				provide: AbstractFollow,
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
			],
			controllers: [FollowController]
		}).compile()

		followController = module.get<FollowController>(FollowController)
		followService = module.get<AbstractFollow>(AbstractFollow)

		app = module.createNestApplication()
		app.useGlobalInterceptors(new NotFoundInterceptor)
		app.useGlobalInterceptors(new UnprocessableEntityInterceptor)

		await app.init()

	})

	it('should be defined', () => {
		expect(followController).toBeDefined()
	})

	it('should be able to return 204', async () => {
		jest.spyOn(followService, 'execute').mockReturnValueOnce(Promise.resolve())

		await request(app.getHttpServer()).patch(`/users/follow/${id}`).set('Authorization', `Bearer: ${token}`).expect(204)

	})

	it('should be able to return 422 exception', async () => {
		jest.spyOn(followService, 'execute').mockImplementationOnce(() => {throw new UnprocessableEntityError()})

		await request(app.getHttpServer()).patch(`/users/follow/${id}`).set('Authorization', `Bearer: ${token}`).expect(422)
	})

	it('should return 404 exception', async () => {
		jest.spyOn(followService, 'execute').mockImplementationOnce(() => {throw new NotFoundError()})

		await request(app.getHttpServer()).patch(`/users/follow/${id}`).set('Authorization', `Bearer: ${token}`).expect(404)
	})

	it('should return 401 unauthorized exception', async () => {
		await request(app.getHttpServer()).patch(`/users/follow/${id}`).expect(401)
	})


	afterAll(() => {
		app.close()
	})

})
