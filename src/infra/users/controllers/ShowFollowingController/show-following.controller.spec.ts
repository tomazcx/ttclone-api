import {Test, TestingModule} from "@nestjs/testing"
import {User} from "src/domain/users/entities/User"
import {ShowFollowingService} from "src/application/users/services/ShowFollowingService"
import {ShowFollowingController} from "."
import {v4 as uuid} from 'uuid'
import * as request from 'supertest'
import {INestApplication} from "@nestjs/common"
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"
import {NotFoundInterceptor} from "src/infra/common/errors/interceptors/not-found.interceptor"

describe('ShowFollowingController', () => {

	let showFollowingController: ShowFollowingController
	let showFollowingService: ShowFollowingService
	let app: INestApplication
	let id: string

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: ShowFollowingService,
					useValue: {
						execute: (x => x)
					}
				}
			],
			controllers: [ShowFollowingController]
		}).compile()


		app = module.createNestApplication()
		app.useGlobalInterceptors(new NotFoundInterceptor)

		showFollowingController = module.get<ShowFollowingController>(ShowFollowingController)
		showFollowingService = module.get<ShowFollowingService>(ShowFollowingService)

		await app.init()

		id = uuid()
	})

	it('should be defined', () => {
		expect(showFollowingController).toBeDefined()
	})

	it('should return 200', async () => {
		jest.spyOn(showFollowingService, 'execute').mockImplementationOnce(() => Promise.resolve([] as User[]))

		await request(app.getHttpServer()).get(`/users/following/${id}`).expect(200)
	})

	it('should throw a 404 exception', async () => {
		jest.spyOn(showFollowingService, 'execute').mockImplementationOnce(() => {throw new NotFoundError()})

		await request(app.getHttpServer()).get(`/users/following/${id}`).expect(404)
	})

	afterAll(() => {
		app.close()
	})

})
