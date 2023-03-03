import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError';
import {User} from "src/domain/users/entities/User";
import {AbstractUpdateImage} from "src/domain/users/services/abstract-update-image.service";
import {UsersRepository} from "../../repositories/users.repository";
import * as fs from 'fs'

@Injectable()
export class UpdateImageService implements AbstractUpdateImage {

	@Inject()
	private usersRepository: UsersRepository

	public async execute(image: string, id: string): Promise<User> {

		const userExists = await this.usersRepository.checkId(id)

		if (!userExists) {
			throw new NotFoundError('User not found')
		}

		const userData = await this.usersRepository.showUser(id)

		if (userData.image !== null) {
			fs.rmSync(`temp/uploads/${userData.image}`)
		}

		const updatedUser = await this.usersRepository.updateImage(image, id)

		return updatedUser
	}

}
