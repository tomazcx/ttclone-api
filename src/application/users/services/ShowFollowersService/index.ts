import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError";
import {User} from "src/domain/users/entities/User";
import {AbstractShowFollowers} from "src/domain/users/services/abstract-show-followers.service";
import {AbstractUsersRepository} from "src/domain/users/repositories/abstract-users.repository";

@Injectable()
export class ShowFollowersService implements AbstractShowFollowers {

	@Inject()
	private usersRepository: AbstractUsersRepository

	public async execute(id: string): Promise<User[]> {

		const userExists = await this.usersRepository.checkId(id)

		if (!userExists) {
			throw new NotFoundError("User not found")
		}

		const users = await this.usersRepository.showFollowers(id)
		return users
	}
}
