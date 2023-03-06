import {Test, TestingModule} from "@nestjs/testing"
import {ToggleRetweetService} from "src/application/tweets/services/ToggleRetweetService"
import {v4 as uuid} from 'uuid'
import * as request from 'supertest'
import {INestApplication} from "@nestjs/common"
import {ToggleRetweetController} from "."
import {JwtStrategy} from "src/infra/auth/strategies/jwt.strategy"
import {generateJwt} from 'src/application/auth/utils/generate-jwt.util'
import {ValidateUserService} from "src/application/auth/services/ValidateUserService"
import {JwtModule} from "@nestjs/jwt"
import 'dotenv/config'
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"
import {NotFoundInterceptor} from "src/infra/common/errors/interceptors/not-found.interceptor"

describe('ToggleRetweetController', () => {

	let controller: ToggleRetweetController
	let service: ToggleRetweetService
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
			controllers: [ToggleRetweetController],
			providers: [
				{
					provide: ToggleRetweetService,
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

		controller = module.get<ToggleRetweetController>(ToggleRetweetController)
		service = module.get<ToggleRetweetService>(ToggleRetweetService)

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

		await request(app.getHttpServer()).put(`/tweets/retweet/${tweetId}`).set('Authorization', `Bearer ${jwt}`).expect(204)
	})

	it('should return 404 error', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundError()})

		await request(app.getHttpServer()).put(`/tweets/retweet/${tweetId}`).set('Authorization', `Bearer ${jwt}`).expect(404)
	})

	it('should return 401 unauthorized exception', async () => {
		await request(app.getHttpServer()).put(`/tweets/retweet/${tweetId}`).expect(401)
	})

	afterAll(() => {
		app.close()
	})

})
