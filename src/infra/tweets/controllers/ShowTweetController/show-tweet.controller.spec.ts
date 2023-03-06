import {INestApplication} from "@nestjs/common"
import {Test, TestingModule} from "@nestjs/testing"
import {Tweet} from "src/domain/tweets/entities/Tweet"
import {ShowTweetService} from "src/application/tweets/services/ShowTweetService"
import {NotFoundInterceptor} from "src/infra/common/errors/interceptors/not-found.interceptor"
import * as request from 'supertest'
import {v4 as uuid} from 'uuid'
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {ShowTweetController} from "."

describe('ShowTweetController', () => {

	let service: ShowTweetService
	let controller: ShowTweetController
	let app: INestApplication

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ShowTweetController],
			providers: [
				{
					provide: ShowTweetService,
					useValue: {
						execute: x => x
					}
				}
			]
		}).compile()

		app = module.createNestApplication()
		app.useGlobalInterceptors(new NotFoundInterceptor)

		controller = module.get<ShowTweetController>(ShowTweetController)
		service = module.get<ShowTweetService>(ShowTweetService)

		await app.init()
	})

	it('should be defined', async () => {
		expect(controller).toBeDefined()
	})

	it('should return 200', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve({} as Tweet))

		await request(app.getHttpServer()).get(`/tweets/${uuid()}`).expect(200)
	})

	it('should throw a 404 exception', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundError})

		await request(app.getHttpServer()).get(`/tweets/${uuid()}`).expect(404)

	})

	afterAll(() => {
		app.close()
	})

})
