import {Test, TestingModule} from "@nestjs/testing"
import {User} from "src/domain/users/entities/User"
import {ShowFollowersController} from "."
import {v4 as uuid} from 'uuid'
import * as request from 'supertest'
import {INestApplication} from "@nestjs/common"
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"
import {NotFoundInterceptor} from "src/infra/common/errors/interceptors/not-found.interceptor"
import {AbstractShowFollowers} from "src/domain/users/services/abstract-show-followers.service"

describe('ShowFollowersController', () => {

	let showFollowersController: ShowFollowersController
	let showFollowersService: AbstractShowFollowers
	let app: INestApplication
	let id: string

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: AbstractShowFollowers,
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
		showFollowersService = module.get<AbstractShowFollowers>(AbstractShowFollowers)

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
