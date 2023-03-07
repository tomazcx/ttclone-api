import {INestApplication} from "@nestjs/common"
import {Test, TestingModule} from "@nestjs/testing"
import {CheckUserNameController} from "."
import * as request from 'supertest'
import {AbstractCheckUserName} from "src/domain/users/services/abstract-check-user-name.service"

describe('CheckUserNameController', () => {

	let controller: CheckUserNameController
	let service: AbstractCheckUserName
	let app: INestApplication

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CheckUserNameController],
			providers: [{
				provide: AbstractCheckUserName,
				useValue: {
					execute: x => x
				}
			}]
		}).compile()

		controller = module.get<CheckUserNameController>(CheckUserNameController)
		service = module.get<AbstractCheckUserName>(AbstractCheckUserName)

		app = module.createNestApplication()
		await app.init()
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it('should return 200 ', async () => {

		const expectedOutput = {
			user: '@user',
			available: false
		}

		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve(expectedOutput))

		await request(app.getHttpServer()).get('/users/isAvailable/user').expect(200)

	})

	afterAll(() => {
		app.close()
	})

})
