import {INestApplication, NotFoundException} from "@nestjs/common"
import {Test, TestingModule} from "@nestjs/testing"
import {UpdateProfileService} from "src/application/users/services/UpdateProfileService"
import {User} from "src/domain/users/entities/User"
import {UpdateProfileController} from "."
import {v4 as uuid} from 'uuid'
import 'dotenv/config'
import {JwtModule} from "@nestjs/jwt"
import * as request from 'supertest'
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"
import {generateJwt} from "src/application/auth/utils/generate-jwt.util"
import {ValidateUserService} from "src/application/auth/services/ValidateUserService"
import {JwtStrategy} from "src/infra/auth/strategies/jwt.strategy"
import {NotFoundInterceptor} from "src/infra/common/errors/interceptors/not-found.interceptor"


describe('UpdateProfileController', () => {

	let controller: UpdateProfileController
	let service: UpdateProfileService
	let app: INestApplication
	let id: string
	let token: string

	beforeEach(async () => {

		id = uuid()
		token = generateJwt(id)

		const module: TestingModule = await Test.createTestingModule({
			imports: [
				JwtModule.register({
					secret: process.env.JWT_SECRET,
					signOptions: {
						expiresIn: process.env.JWT_EXPIRES_IN
					}
				})
			],
			controllers: [UpdateProfileController],
			providers: [
				{
					provide: UpdateProfileService,
					useValue: {
						execute: (x => x)
					}
				},
				{
					provide: ValidateUserService,
					useValue: {
						execute: () => Promise.resolve({id})
					}
				},
				JwtStrategy
			]
		}).compile()

		app = module.createNestApplication()
		app.useGlobalInterceptors(new NotFoundInterceptor)

		controller = module.get<UpdateProfileController>(UpdateProfileController)
		service = module.get<UpdateProfileService>(UpdateProfileService)

		await app.init()

	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it("should return 200", async () => {

		const updateProfileDto = {
			name: 'test-name',
			desc: 'test-desc',
			localization: 'test-localization',
			url: 'test.url'
		}

		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve({} as User))

		await request(app.getHttpServer()).put('/users').set('Authorization', `Bearer: ${token}`).send(updateProfileDto).expect(200)
	})

	it('should return 404 exception', async () => {
		const updateProfileDto = {
			name: 'test-name',
			desc: 'test-desc',
			localization: 'test-localization',
			url: 'test.url'
		}

		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundError})

		await request(app.getHttpServer()).put('/users').set('Authorization', `Bearer: ${token}`).send(updateProfileDto).expect(404)
	})

	it('should throw a 401 unauthorized exception', async () => {
		await request(app.getHttpServer()).put('/users').expect(401)
	})


	afterAll(() => {
		app.close()
	})


})

