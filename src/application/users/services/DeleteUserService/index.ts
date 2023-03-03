import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {Inject, Injectable} from "@nestjs/common";
import {AbstractDeleteUser} from "src/domain/users/services/abstract-delete-user.service";
import {UsersRepository} from "../../repositories/users.repository";
import * as fs from 'fs'

@Injectable()
export class DeleteUserService implements AbstractDeleteUser {

	@Inject()
	private usersRepository: UsersRepository

	public async execute(id: string): Promise<void> {
		const userExists = await this.usersRepository.checkId(id)

		if (!userExists) {
			throw new NotFoundError('User not found')
		}

		const userData = await this.usersRepository.showUser(id)

		if (userData.image) {
			fs.rmSync(`temp/uploads/${userData.image}`)
		}

		if (userData.banner) {
			fs.rmSync(`temp/uploads/${userData.banner}`)
		}

		await this.usersRepository.deleteUser(id)
	}

}
