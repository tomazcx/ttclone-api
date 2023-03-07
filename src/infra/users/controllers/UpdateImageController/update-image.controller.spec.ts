import {INestApplication} from "@nestjs/common"
import {Test, TestingModule} from "@nestjs/testing"
import {User} from "src/domain/users/entities/User"
import {UpdateImageController} from "."
import {v4 as uuid} from 'uuid'
import 'dotenv/config'
import {JwtModule} from "@nestjs/jwt"
import * as request from 'supertest'
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError"
import {ValidateUserService} from "src/application/auth/services/ValidateUserService"
import {JwtStrategy} from "src/infra/auth/strategies/jwt.strategy"
import {generateJwt} from "src/application/auth/utils/generate-jwt.util"
import {NotFoundInterceptor} from "src/infra/common/errors/interceptors/not-found.interceptor"
import {AbstractUpdateImage} from "src/domain/users/services/abstract-update-image.service"

describe('UpdateImageController', () => {

	let controller: UpdateImageController
	let service: AbstractUpdateImage
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
			controllers: [UpdateImageController],
			providers: [{
				provide: AbstractUpdateImage,
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

		controller = module.get<UpdateImageController>(UpdateImageController)
		service = module.get<AbstractUpdateImage>(AbstractUpdateImage)

		await app.init()
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it("should return 200", async () => {
		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve({} as User))

		await request(app.getHttpServer()).patch('/users/image').attach('image', Buffer.from('test image'), 'test.jpg').set('Authorization', `Bearer: ${token}`).expect(200)
	})

	it('should throw a 404 exception', async () => {

		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundError})

		await request(app.getHttpServer()).patch('/users/image').attach('image', Buffer.from('test image'), 'test.jpg').set('Authorization', `Bearer: ${token}`).expect(404)
	})

	it('should throw a 401 unauthorized exception', async () => {
		await request(app.getHttpServer()).patch('/users/image').expect(401)
	})


	afterAll(() => {
		app.close()
	})
})

