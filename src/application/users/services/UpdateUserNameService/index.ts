import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {User} from "src/domain/users/entities/User";
import {AbstractUpdateUserName} from "src/domain/users/services/abstract-update-user-name.service";
import {UpdateUserNameDto} from "../../dto/update-user-name.dto";
import {UsersRepository} from "../../repositories/users.repository";
import {UnprocessableEntityError} from "src/infra/common/errors/types/UnprocessableEntityError";

@Injectable()
export class UpdateUserNameService implements AbstractUpdateUserName {

	@Inject()
	private usersRepository: UsersRepository

	public async execute({user}: UpdateUserNameDto, id: string): Promise<User> {
		if (user.charAt(0) !== '@') {
			user = `@${user}`
		}

		const userExists = await this.usersRepository.checkId(id)

		if (!userExists) {
			throw new NotFoundError('User not found')
		}

		const userNameIsBeingUsed = await this.usersRepository.checkUserName(user)

		if (userNameIsBeingUsed) {
			throw new UnprocessableEntityError('User name already being used.')
		}


		return await this.usersRepository.updateUserName(user, id)
	}


}
