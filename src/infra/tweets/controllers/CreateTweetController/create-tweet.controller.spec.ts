import {Test, TestingModule} from "@nestjs/testing"
import {CreateTweetService} from "src/application/tweets/services/CreateTweetService"
import {v4 as uuid} from 'uuid'
import * as request from 'supertest'
import {INestApplication} from "@nestjs/common"
import {CreateTweetController} from "."
import {JwtStrategy} from "src/infra/auth/strategies/jwt.strategy"
import {generateJwt} from 'src/application/auth/utils/generate-jwt.util'
import {ValidateUserService} from "src/application/auth/services/ValidateUserService"
import {JwtModule} from "@nestjs/jwt"
import 'dotenv/config'
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"
import {NotFoundInterceptor} from "src/infra/common/errors/interceptors/not-found.interceptor"

describe('CreateTweetController', () => {

	let controller: CreateTweetController
	let service: CreateTweetService
	let app: INestApplication
	let authorId: string
	let jwt: string

	beforeAll(async () => {

		authorId = uuid()
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				JwtModule.register({
					secret: process.env.JWT_SECRET,
					signOptions: {
						expiresIn: process.env.JWT_EXPIRES_IN
					}
				})
			],
			controllers: [CreateTweetController],
			providers: [
				{
					provide: CreateTweetService,
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

		controller = module.get<CreateTweetController>(CreateTweetController)
		service = module.get<CreateTweetService>(CreateTweetService)

		jwt = generateJwt(authorId)
		app = module.createNestApplication()
		app.useGlobalInterceptors(new NotFoundInterceptor)

		await app.init()
	})

	it('should be defined', async () => {
		expect(controller).toBeDefined()
	})

	it('should return 201', async () => {
		const expectedOutput = {
			id: uuid(),
			content: 'content-tweet',
			authorId,
			created_at: new Date()
		}

		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve(expectedOutput))

		const createTweetDto = {
			content: 'content-tweet'
		}

		await request(app.getHttpServer()).post('/tweets').send(createTweetDto).set('Authorization', `Bearer ${jwt}`).expect(201)
	})

	it('should return 404 error', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundError()})

		const createTweetDto = {
			content: 'content-tweet'
		}

		await request(app.getHttpServer()).post('/tweets').send(createTweetDto).set('Authorization', `Bearer ${jwt}`).expect(404)
	})

	it('should return 401 unauthorized exception', async () => {

		const createTweetDto = {
			content: 'content-tweet'
		}

		await request(app.getHttpServer()).post('/tweets').send(createTweetDto).expect(401)
	})

	afterAll(() => {
		app.close()
	})

})
