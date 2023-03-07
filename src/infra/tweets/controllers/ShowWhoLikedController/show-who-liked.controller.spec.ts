import {INestApplication} from "@nestjs/common"
import {Test, TestingModule} from "@nestjs/testing"
import {NotFoundInterceptor} from "src/infra/common/errors/interceptors/not-found.interceptor"
import * as request from 'supertest'
import {v4 as uuid} from 'uuid'
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {ShowWhoLikedController} from "."
import {User} from "src/domain/users/entities/User"
import {AbstractShowWhoLiked} from "src/domain/tweets/services/abstract-show-who-liked.service"

describe('ShowWhoLikedController', () => {

	let service: AbstractShowWhoLiked
	let controller: ShowWhoLikedController
	let app: INestApplication

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ShowWhoLikedController],
			providers: [
				{
					provide: AbstractShowWhoLiked,
					useValue: {
						execute: x => x
					}
				}
			]
		}).compile()

		app = module.createNestApplication()
		app.useGlobalInterceptors(new NotFoundInterceptor)

		controller = module.get<ShowWhoLikedController>(ShowWhoLikedController)
		service = module.get<AbstractShowWhoLiked>(AbstractShowWhoLiked)

		await app.init()
	})

	it('should be defined', async () => {
		expect(controller).toBeDefined()
	})

	it('should return 200', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve([] as User[]))

		await request(app.getHttpServer()).get(`/tweets/like/${uuid()}`).expect(200)
	})

	it('should throw a 404 exception', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundError})

		await request(app.getHttpServer()).get(`/tweets/like/${uuid()}`).expect(404)

	})

	afterAll(() => {
		app.close()
	})

})
