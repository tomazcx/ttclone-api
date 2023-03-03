import {BadRequestException, NotFoundException, UnprocessableEntityException} from "@nestjs/common"
import {Test, TestingModule} from "@nestjs/testing"
import {UpdatePasswordService} from "src/application/users/services/UpdatePasswordService"
import {User} from "src/domain/users/entities/User"
import {UpdatePasswordController} from "."
import {v4 as uuid} from 'uuid'

describe('UpdatePasswordController', () => {

	let controller: UpdatePasswordController
	let service: UpdatePasswordService
	let req: any

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UpdatePasswordController],
			providers: [{
				provide: UpdatePasswordService,
				useValue: {
					execute: (x => x)
				}
			}]
		}).compile()

		controller = module.get<UpdatePasswordController>(UpdatePasswordController)
		service = module.get<UpdatePasswordService>(UpdatePasswordService)
		req = {user: uuid()}
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it("should update the user's password", async () => {

		const updatePasswordDto = {
			oldPassword: '1234',
			password: 'test-password',
			confirmPassword: 'test-password'
		}

		jest.spyOn(service, 'execute').mockImplementationOnce(() => Promise.resolve({} as User))

		await expect(controller.handle(updatePasswordDto, req)).resolves.toBeTruthy()
	})

	it('should throw a not found exception', async () => {
		const updatePasswordDto = {
			oldPassword: '1234',
			password: 'test-password',
			confirmPassword: 'test-password'
		}

		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new NotFoundException})

		await expect(controller.handle(updatePasswordDto, req)).rejects.toBeInstanceOf(NotFoundException)
	})

	it('should throw a bad request exception', async () => {
		const updatePasswordDto = {
			oldPassword: '1234',
			password: 'test-password',
			confirmPassword: 'test-password'
		}

		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new BadRequestException})

		await expect(controller.handle(updatePasswordDto, req)).rejects.toBeInstanceOf(BadRequestException)
	})

	it('should throw a unprocessable entity exception', async () => {
		const updatePasswordDto = {
			oldPassword: '1234',
			password: 'test-password',
			confirmPassword: 'test-password'
		}

		jest.spyOn(service, 'execute').mockImplementationOnce(() => {throw new UnprocessableEntityException})

		await expect(controller.handle(updatePasswordDto, req)).rejects.toBeInstanceOf(UnprocessableEntityException)
	})


})

