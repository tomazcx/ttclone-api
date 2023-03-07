import {INestApplication} from "@nestjs/common"
import {Test, TestingModule} from "@nestjs/testing"
import {Tweet} from "src/domain/tweets/entities/Tweet"
import {NotFoundInterceptor} from "src/infra/common/errors/interceptors/not-found.interceptor"
import * as request from 'supertest'
import {v4 as uuid} from 'uuid'
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {ShowUserTweetsController} from "."
import {AbstractShowUserTweets} from "src/domain/tweets/services/abstract-show-user-tweets.service"

describe('ShowUserTweetsController', () => {

	let service: AbstractShowUserTweets
	let controller: ShowUserTweetsController
	let app: INestApplication

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ShowUserTweetsController],
			providers: [
				{
					provide: AbstractShowUserTweets,
					useValue: {
						execute: x => x
					}
				}
			]
		}).compile()

		app = module.createNestApplication()
		app.useGlobalInterceptors(new NotFoundInterceptor)

		controller = module.get<ShowUserTweetsController>(ShowUserTweetsController)
		service = module.get<AbstractShowUserTweets>(AbstractShowUserTweets)

		await app.init()
	})

	it('should be defined', async () => {
		expect(controller).toBeDefined()
	})

	it('should return 200', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve([] as Tweet[]))

		await request(app.getHttpServer()).get(`/tweets/user/${uuid()}`).expect(200)
	})

	it('should throw a 404 exception', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundError})

		await request(app.getHttpServer()).get(`/tweets/user/${uuid()}`).expect(404)

	})

	afterAll(() => {
		app.close()
	})

})
