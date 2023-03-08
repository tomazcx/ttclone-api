import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError";
import {AbstractShowUser} from "src/domain/users/services/abstract-show-user.service";
import {AbstractUsersRepository} from "src/domain/users/repositories/abstract-users.repository";
import {UserTweets} from "src/domain/users/entities/UserTweets";

@Injectable()
export class ShowUserService implements AbstractShowUser {

	@Inject()
	private usersRepository: AbstractUsersRepository

	public async execute(id: string): Promise<UserTweets> {
		const user = await this.usersRepository.checkId(id)

		if (!user) {
			throw new NotFoundError("User not found.")
		}

		return await this.usersRepository.showUser(id)
	}

}
