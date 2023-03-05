import {Test, TestingModule} from "@nestjs/testing"
import {User} from "src/domain/users/entities/User"
import {ShowFollowersService} from "src/application/users/services/ShowFollowersService"
import {ShowFollowersController} from "."
import {v4 as uuid} from 'uuid'
import * as request from 'supertest'
import {INestApplication} from "@nestjs/common"
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"
import {NotFoundInterceptor} from "src/infra/common/errors/interceptors/not-found.interceptor"

describe('ShowFollowersController', () => {

	let showFollowersController: ShowFollowersController
	let showFollowersService: ShowFollowersService
	let app: INestApplication
	let id: string

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: ShowFollowersService,
					useValue: {
						execute: (x => x)
					}
				}
			],
			controllers: [ShowFollowersController]
		}).compile()

		app = module.createNestApplication()
		app.useGlobalInterceptors(new NotFoundInterceptor)

		showFollowersController = module.get<ShowFollowersController>(ShowFollowersController)
		showFollowersService = module.get<ShowFollowersService>(ShowFollowersService)

		id = uuid()

		await app.init()
	})

	it('should be defined', () => {
		expect(showFollowersController).toBeDefined()
	})

	it('should return 200', async () => {
		jest.spyOn(showFollowersService, 'execute').mockImplementationOnce(() => Promise.resolve([] as User[]))

		await request(app.getHttpServer()).get(`/users/followers/${id}`).expect(200)
	})

	it('should throw a 404 exception', async () => {
		jest.spyOn(showFollowersService, 'execute').mockImplementationOnce(() => {throw new NotFoundError()})

		await request(app.getHttpServer()).get(`/users/followers/${id}`).expect(404)
	})

	afterAll(() => {
		app.close()
	})


})
