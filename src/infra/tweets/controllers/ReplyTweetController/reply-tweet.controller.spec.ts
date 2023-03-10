import {Test, TestingModule} from "@nestjs/testing"
import {v4 as uuid} from 'uuid'
import * as request from 'supertest'
import {INestApplication} from "@nestjs/common"
import {ReplyTweetController} from "."
import {JwtStrategy} from "src/infra/auth/strategies/jwt.strategy"
import {generateJwt} from 'src/application/auth/utils/generate-jwt.util'
import {ValidateUserService} from "src/application/auth/services/ValidateUserService"
import {JwtModule} from "@nestjs/jwt"
import 'dotenv/config'
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"
import {NotFoundInterceptor} from "src/infra/common/errors/interceptors/not-found.interceptor"
import {Tweet} from "src/domain/tweets/entities/Tweet"
import {AbstractReplyTweet} from "src/domain/tweets/services/abstract-reply-tweet.service"

describe('ReplyTweetController', () => {

	let controller: ReplyTweetController
	let service: AbstractReplyTweet
	let app: INestApplication
	let authorId: string
	let tweetId: string
	let jwt: string

	beforeAll(async () => {

		authorId = uuid()
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
			controllers: [ReplyTweetController],
			providers: [
				{
					provide: AbstractReplyTweet,
					useValue: {
						execute: x => x
					},
				},
				{
					provide: ValidateUserService,
					useValue: {
						execute: () => Promise.resolve({id: authorId})
					}
				},
				JwtStrategy
			]
		}).compile()

		controller = module.get<ReplyTweetController>(ReplyTweetController)
		service = module.get<AbstractReplyTweet>(AbstractReplyTweet)

		jwt = generateJwt(authorId)

		app = module.createNestApplication()
		app.useGlobalInterceptors(new NotFoundInterceptor)

		await app.init()
	})

	it('should be defined', async () => {
		expect(controller).toBeDefined()
	})

	it('should return 201', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve({} as Tweet))

		const createTweetDto = {
			content: 'test-content'
		}

		await request(app.getHttpServer()).post(`/tweets/reply/${tweetId}`).send(createTweetDto).set('Authorization', `Bearer ${jwt}`).expect(201)
	})

	it('should return 404 error', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundError()})

		const createTweetDto = {
			content: 'test-content'
		}

		await request(app.getHttpServer()).post(`/tweets/reply/${tweetId}`).send(createTweetDto).set('Authorization', `Bearer ${jwt}`).expect(404)
	})

	it('should return 401 unauthorized exception', async () => {
		await request(app.getHttpServer()).post(`/tweets/reply/${tweetId}`).expect(401)
	})

	afterAll(() => {
		app.close()
	})

})
