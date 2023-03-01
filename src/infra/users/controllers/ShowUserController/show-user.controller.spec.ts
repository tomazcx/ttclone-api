import {Test, TestingModule} from '@nestjs/testing';
import {ShowUserService} from 'src/application/users/services/ShowUserService';
import {ShowUserController} from '.'
import {v4 as uuid} from 'uuid'

describe('ShowUserController', () => {
	let controller: ShowUserController;
	let showUserService: ShowUserService
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

		controller = module.get<ShowUserController>(ShowUserController);
		showUserService = module.get<ShowUserService>(ShowUserService)
		id = uuid()
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should return OK', async () => {

		const expectedOutput = {
			id,
			name: 'test-name',
			email: 'test@email.com',
			created_at: new Date(),
			user: '@test'
		}

		jest.spyOn(showUserService, 'execute').mockImplementationOnce(() => Promise.resolve(expectedOutput))

		const result = await controller.handle(id)

		expect(result).toStrictEqual(expectedOutput)
	})
});
