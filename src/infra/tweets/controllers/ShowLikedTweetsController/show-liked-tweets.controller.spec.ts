import {INestApplication} from "@nestjs/common"
import {Test, TestingModule} from "@nestjs/testing"
import {Tweet} from "src/domain/tweets/entities/Tweet"
import {NotFoundInterceptor} from "src/infra/common/errors/interceptors/not-found.interceptor"
import * as request from 'supertest'
import {v4 as uuid} from 'uuid'
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {ShowLikedTweetsController} from "."
import {AbstractShowLikedTweets} from "src/domain/tweets/services/abstract-show-liked-tweets.service"

describe('ShowLikedTweetsController', () => {

	let service: AbstractShowLikedTweets
	let controller: ShowLikedTweetsController
	let app: INestApplication

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ShowLikedTweetsController],
			providers: [
				{
					provide: AbstractShowLikedTweets,
					useValue: {
						execute: x => x
					}
				}
			]
		}).compile()

		app = module.createNestApplication()
		app.useGlobalInterceptors(new NotFoundInterceptor)

		controller = module.get<ShowLikedTweetsController>(ShowLikedTweetsController)
		service = module.get<AbstractShowLikedTweets>(AbstractShowLikedTweets)

		await app.init()
	})

	it('should be defined', async () => {
		expect(controller).toBeDefined()
	})

	it('should return 200', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve([] as Tweet[]))

		await request(app.getHttpServer()).get(`/tweets/like/all/${uuid()}`).expect(200)
	})

	it('should throw a 404 exception', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundError})

		await request(app.getHttpServer()).get(`/tweets/like/all/${uuid()}`).expect(404)

	})

	afterAll(() => {
		app.close()
	})

})
