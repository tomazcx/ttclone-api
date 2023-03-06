import {Test, TestingModule} from "@nestjs/testing"
import {DeleteTweetService} from "src/application/tweets/services/DeleteTweetService"
import {v4 as uuid} from 'uuid'
import * as request from 'supertest'
import {INestApplication} from "@nestjs/common"
import {DeleteTweetController} from "."
import {JwtStrategy} from "src/infra/auth/strategies/jwt.strategy"
import {generateJwt} from 'src/application/auth/utils/generate-jwt.util'
import {ValidateUserService} from "src/application/auth/services/ValidateUserService"
import {JwtModule} from "@nestjs/jwt"
import 'dotenv/config'
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"
import {NotFoundInterceptor} from "src/infra/common/errors/interceptors/not-found.interceptor"
import {ForbiddenError} from "src/infra/common/errors/types/ForbiddenError"
import {ForbiddenInterceptor} from "src/infra/common/errors/interceptors/forbidden.interceptor"

describe('DeleteTweetController', () => {

	let controller: DeleteTweetController
	let service: DeleteTweetService
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
			controllers: [DeleteTweetController],
			providers: [
				{
					provide: DeleteTweetService,
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

		controller = module.get<DeleteTweetController>(DeleteTweetController)
		service = module.get<DeleteTweetService>(DeleteTweetService)

		jwt = generateJwt(authorId)

		app = module.createNestApplication()
		app.useGlobalInterceptors(new NotFoundInterceptor)
		app.useGlobalInterceptors(new ForbiddenInterceptor)

		await app.init()
	})

	it('should be defined', async () => {
		expect(controller).toBeDefined()
	})

	it('should return 204', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve())

		await request(app.getHttpServer()).delete(`/tweets/${tweetId}`).set('Authorization', `Bearer ${jwt}`).expect(204)
	})

	it('should return 404 error', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundError()})

		await request(app.getHttpServer()).delete(`/tweets/${tweetId}`).set('Authorization', `Bearer ${jwt}`).expect(404)
	})

	it('should return a 403 forbidden exception', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new ForbiddenError()})

		await request(app.getHttpServer()).delete(`/tweets/${tweetId}`).set('Authorization', `Bearer ${jwt}`).expect(403)
	})

	it('should return 401 unauthorized exception', async () => {
		await request(app.getHttpServer()).delete(`/tweets/${tweetId}`).expect(401)
	})

	afterAll(() => {
		app.close()
	})

})
