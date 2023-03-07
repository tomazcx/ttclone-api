import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {User} from "src/domain/users/entities/User";
import {AbstractUpdateBanner} from "src/domain/users/services/abstract-update-banner.service";
import * as fs from 'fs'
import {AbstractUsersRepository} from "src/domain/users/repositories/abstract-users.repository";

@Injectable()
export class UpdateBannerService implements AbstractUpdateBanner {

	@Inject()
	private usersRepository: AbstractUsersRepository

	public async execute(banner: string, id: string): Promise<User> {
		const userExists = await this.usersRepository.checkId(id)

		if (!userExists) {
			throw new NotFoundError('User not found')
		}

		const userData = await this.usersRepository.showUser(id)

		if (userData.banner !== null) {
			fs.rmSync(`temp/uploads/${userData.banner}`)
		}

		const updatedUser = await this.usersRepository.updateBanner(banner, id)

		return updatedUser
	}

}
