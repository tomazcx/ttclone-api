import {Test, TestingModule} from "@nestjs/testing"
import {ToggleLikeTweetService} from "src/application/tweets/services/ToggleLikeTweetService"
import {v4 as uuid} from 'uuid'
import * as request from 'supertest'
import {INestApplication} from "@nestjs/common"
import {ToggleLikeTweetController} from "."
import {JwtStrategy} from "src/infra/auth/strategies/jwt.strategy"
import {generateJwt} from 'src/application/auth/utils/generate-jwt.util'
import {ValidateUserService} from "src/application/auth/services/ValidateUserService"
import {JwtModule} from "@nestjs/jwt"
import 'dotenv/config'
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"
import {NotFoundInterceptor} from "src/infra/common/errors/interceptors/not-found.interceptor"

describe('ToggleLikeTweetController', () => {

	let controller: ToggleLikeTweetController
	let service: ToggleLikeTweetService
	let app: INestApplication
	let userWhoLikesId: string
	let tweetId: string
	let jwt: string

	beforeAll(async () => {

		userWhoLikesId = uuid()
		tweetId = uuid()
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				JwtModule.register({
					secret: process.env.JWT_SECRET,
					signOptions: {
						expiresIn: process.env.JWT_EXPIRES_IN
					}
				})
			],
			controllers: [ToggleLikeTweetController],
			providers: [
				{
					provide: ToggleLikeTweetService,
					useValue: {
						execute: x => x
					},
				},
				{
					provide: ValidateUserService,
					useValue: {
						execute: () => Promise.resolve({id: userWhoLikesId})
					}
				},
				JwtStrategy
			]
		}).compile()

		controller = module.get<ToggleLikeTweetController>(ToggleLikeTweetController)
		service = module.get<ToggleLikeTweetService>(ToggleLikeTweetService)

		jwt = generateJwt(userWhoLikesId)

		app = module.createNestApplication()
		app.useGlobalInterceptors(new NotFoundInterceptor)

		await app.init()
	})

	it('should be defined', async () => {
		expect(controller).toBeDefined()
	})

	it('should return 204', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve())

		await request(app.getHttpServer()).put(`/tweets/like/${tweetId}`).set('Authorization', `Bearer ${jwt}`).expect(204)
	})

	it('should return 404 error', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundError()})

		await request(app.getHttpServer()).put(`/tweets/like/${tweetId}`).set('Authorization', `Bearer ${jwt}`).expect(404)
	})

	it('should return 401 unauthorized exception', async () => {
		await request(app.getHttpServer()).put(`/tweets/like/${tweetId}`).expect(401)
	})

	afterAll(() => {
		app.close()
	})

})
