import {Test, TestingModule} from '@nestjs/testing';
import {ShowUserController} from '.'

describe('ShowUserController', () => {
	let controller: ShowUserController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ShowUserController],
		}).compile();

		controller = module.get<ShowUserController>(ShowUserController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
