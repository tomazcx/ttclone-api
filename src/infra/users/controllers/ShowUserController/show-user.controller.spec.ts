import {Test, TestingModule} from '@nestjs/testing';
import {ShowUserController} from '.'
import {v4 as uuid} from 'uuid'
import {INestApplication} from '@nestjs/common';
import {NotFoundInterceptor} from 'src/infra/common/errors/interceptors/not-found.interceptor';
import * as request from 'supertest'
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"
import {AbstractShowUser} from 'src/domain/users/services/abstract-show-user.service';
import {UserTweets} from 'src/domain/users/entities/UserTweets';

describe('ShowUserController', () => {
	let controller: ShowUserController;
	let showUserService: AbstractShowUser
	let app: INestApplication
	let id: string

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ShowUserController],
			providers: [{
				provide: AbstractShowUser,
				useValue: {
					execute: (x => x)
				}
			}]
		}).compile();

		app = module.createNestApplication()
		app.useGlobalInterceptors(new NotFoundInterceptor)

		controller = module.get<ShowUserController>(ShowUserController);
		showUserService = module.get<AbstractShowUser>(AbstractShowUser)

		await app.init()

		id = uuid()
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should return 200 status', async () => {
		jest.spyOn(showUserService, 'execute').mockImplementationOnce(() => Promise.resolve({} as UserTweets))

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
