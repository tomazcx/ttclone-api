import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError";
import {User} from "src/domain/users/entities/User";
import {AbstractUpdateProfile} from "src/domain/users/services/abstract-update-profile.service";
import {UpdateProfileDto} from "../../dto/update-profile.dto";
import {UsersRepository} from "../../repositories/users.repository";

@Injectable()
export class UpdateProfileService implements AbstractUpdateProfile {

	@Inject()
	private usersRepository: UsersRepository

	public async execute(updateProfileDto: UpdateProfileDto, id: string): Promise<User> {
		const usersExists = await this.usersRepository.checkId(id)

		if (!usersExists) {
			throw new NotFoundError('User not found')
		}

		const result = await this.usersRepository.updateProfile(updateProfileDto, id)
		return result
	}

}
