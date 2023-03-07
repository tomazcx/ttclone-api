import {INestApplication} from "@nestjs/common"
import {Test, TestingModule} from "@nestjs/testing"
import {User} from "src/domain/users/entities/User"
import {UpdateBannerController} from "."
import {v4 as uuid} from 'uuid'
import 'dotenv/config'
import {ValidateUserService} from "src/application/auth/services/ValidateUserService"
import {JwtStrategy} from "src/infra/auth/strategies/jwt.strategy"
import * as request from 'supertest'
import {generateJwt} from "src/application/auth/utils/generate-jwt.util"
import {JwtModule} from "@nestjs/jwt"
import {NotFoundInterceptor} from "src/infra/common/errors/interceptors/not-found.interceptor"
import * as fs from 'fs'
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"
import {AbstractUpdateBanner} from "src/domain/users/services/abstract-update-banner.service"

describe('UpdateBannerController', () => {

	let controller: UpdateBannerController
	let service: AbstractUpdateBanner
	let app: INestApplication
	let id: string
	let token: string

	beforeEach(async () => {
		id = uuid()
		token = generateJwt(id)
		fs.writeFileSync('./text.jpeg', '')

		const module: TestingModule = await Test.createTestingModule({
			imports: [
				JwtModule.register({
					secret: process.env.JWT_SECRET,
					signOptions: {
						expiresIn: process.env.JWT_EXPIRES_IN
					}
				})
			],
			controllers: [UpdateBannerController],
			providers: [{
				provide: AbstractUpdateBanner,
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

		controller = module.get<UpdateBannerController>(UpdateBannerController)
		service = module.get<AbstractUpdateBanner>(AbstractUpdateBanner)

		await app.init()
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it("should return 200 status", async () => {

		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve({} as User))

		await request(app.getHttpServer()).patch('/users/banner').attach('banner', Buffer.from('test image'), 'test.jpg').set('Authorization', `Bearer: ${token}`).expect(200)
	})

	it('should throw a 404 exception', async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundError})

		await request(app.getHttpServer()).patch('/users/banner').attach('banner', Buffer.from('test image'), 'test.jpg').set('Authorization', `Bearer: ${token}`).expect(404)
	})

	it('should throw a 401 unauthorized exception', async () => {
		await request(app.getHttpServer()).patch('/users/banner').expect(401)
	})

	afterAll(() => {
		fs.rmSync('./text.jpeg')
		app.close()
	})

})

