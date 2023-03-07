import {Test, TestingModule} from "@nestjs/testing"
import {v4 as uuid} from 'uuid'
import * as request from 'supertest'
import {INestApplication} from "@nestjs/common"
import {ShowSavedTweetsController} from "."
import {JwtStrategy} from "src/infra/auth/strategies/jwt.strategy"
import {generateJwt} from 'src/application/auth/utils/generate-jwt.util'
import {ValidateUserService} from "src/application/auth/services/ValidateUserService"
import {JwtModule} from "@nestjs/jwt"
import 'dotenv/config'
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"
import {NotFoundInterceptor} from "src/infra/common/errors/interceptors/not-found.interceptor"
import {Tweet} from "src/domain/tweets/entities/Tweet"
import {AbstractShowSavedTweets} from "src/domain/tweets/services/abstract-show-saved-tweets.service"

describe('ShowSavedTweetsController', () => {

	let controller: ShowSavedTweetsController
	let service: AbstractShowSavedTweets
	let app: INestApplication
	let userId: string
	let jwt: string

	beforeAll(async () => {

		userId = uuid()
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				JwtModule.register({
					secret: process.env.JWT_SECRET,
					signOptions: {
						expiresIn: process.env.JWT_EXPIRES_IN
					}
				})
			],
			controllers: [ShowSavedTweetsController],
			providers: [
				{
					provide: AbstractShowSavedTweets,
					useValue: {
						execute: x => x
					},
				},
				{
					provide: ValidateUserService,
					useValue: {
						execute: () => Promise.resolve({id: userId})
					}
				},
				JwtStrategy
			]
		}).compile()

		controller = module.get<ShowSavedTweetsController>(ShowSavedTweetsController)
		service = module.get<AbstractShowSavedTweets>(AbstractShowSavedTweets)

		jwt = generateJwt(userId)

		app = module.createNestApplication()
		app.useGlobalInterceptors(new NotFoundInterceptor)

		await app.init()
	})

	it('should be defined', async () => {
		expect(controller).toBeDefined()
	})

	it('should return 200', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve([] as Tweet[]))

		await request(app.getHttpServer()).get(`/tweets/save/all`).set('Authorization', `Bearer ${jwt}`).expect(200)
	})

	it('should return 404 error', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundError()})

		await request(app.getHttpServer()).get(`/tweets/save/all`).set('Authorization', `Bearer ${jwt}`).expect(404)
	})

	it('should return 401 unauthorized exception', async () => {
		await request(app.getHttpServer()).get(`/tweets/save/all`).expect(401)
	})

	afterAll(() => {
		app.close()
	})

})
