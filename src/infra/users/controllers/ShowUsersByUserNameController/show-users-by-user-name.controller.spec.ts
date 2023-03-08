import {Test, TestingModule} from "@nestjs/testing"
import {ShowUsersByUserNameController} from "."
import {v4 as uuid} from 'uuid'
import {INestApplication} from "@nestjs/common"
import * as request from 'supertest'
import {User} from "src/domain/users/entities/User"
import {AbstractShowUsersByUserName} from "src/domain/users/services/abstract-show-users-by-user-name.service"

describe("ShowUserByUserNameController", () => {

	let controller: ShowUsersByUserNameController
	let service: AbstractShowUsersByUserName
	let app: INestApplication
	let id: string

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ShowUsersByUserNameController],
			providers: [{
				provide: AbstractShowUsersByUserName,
				useValue: {
					execute: (x => x)
				}
			}]
		}).compile()

		app = module.createNestApplication()

		controller = module.get<ShowUsersByUserNameController>(ShowUsersByUserNameController)
		service = module.get<AbstractShowUsersByUserName>(AbstractShowUsersByUserName)

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
