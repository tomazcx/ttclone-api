import {Test, TestingModule} from "@nestjs/testing"
import {ShowUsersByUserNameService} from "src/application/users/services/ShowUsersByUserNameService"
import {ShowUsersByUserNameController} from "."
import {v4 as uuid} from 'uuid'
import {INestApplication} from "@nestjs/common"
import * as request from 'supertest'
import {User} from "src/domain/users/entities/User"

describe("ShowUserByUserNameController", () => {

	let controller: ShowUsersByUserNameController
	let service: ShowUsersByUserNameService
	let app: INestApplication
	let id: string

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ShowUsersByUserNameController],
			providers: [{
				provide: ShowUsersByUserNameService,
				useValue: {
					execute: (x => x)
				}
			}]
		}).compile()

		app = module.createNestApplication()

		controller = module.get<ShowUsersByUserNameController>(ShowUsersByUserNameController)
		service = module.get<ShowUsersByUserNameService>(ShowUsersByUserNameService)

		await app.init()

		id = uuid()
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it('should return status of 200', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve([] as User[]))

		await request(app.getHttpServer()).get('/users/search/@user').expect(200)
	})

	afterAll(() => {
		app.close()
	})


})
