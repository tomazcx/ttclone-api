import {Test, TestingModule} from '@nestjs/testing';
import {ShowUserService} from 'src/application/users/services/ShowUserService';
import {ShowUserController} from '.'
import {v4 as uuid} from 'uuid'
import {INestApplication} from '@nestjs/common';
import {NotFoundInterceptor} from 'src/infra/common/errors/interceptors/not-found.interceptor';
import {User} from "src/domain/users/entities/User"
import * as request from 'supertest'
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"

describe('ShowUserController', () => {
	let controller: ShowUserController;
	let showUserService: ShowUserService
	let app: INestApplication
	let id: string

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ShowUserController],
			providers: [{
				provide: ShowUserService,
				useValue: {
					execute: (x => x)
				}
			}]
		}).compile();

		app = module.createNestApplication()
		app.useGlobalInterceptors(new NotFoundInterceptor)

		controller = module.get<ShowUserController>(ShowUserController);
		showUserService = module.get<ShowUserService>(ShowUserService)

		await app.init()

		id = uuid()
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should return 200 status', async () => {
		jest.spyOn(showUserService, 'execute').mockImplementationOnce(() => Promise.resolve({} as User))

		await request(app.getHttpServer()).get(`/users/${id}`).expect(200)
	})

	it('should return a 404 exception', async () => {
		jest.spyOn(showUserService, 'execute').mockImplementationOnce(() => {throw new NotFoundError})

		await request(app.getHttpServer()).get(`/users/${id}`).expect(404)
	})

	afterAll(() => {
		app.close()
	})
});
