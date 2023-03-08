import {Inject, Injectable} from "@nestjs/common";
import {UserTweets} from "src/domain/users/entities/UserTweets";
import {AbstractShowUserByUserName} from "src/domain/users/services/abstract-show-user-by-user-name.service";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {AbstractUsersRepository} from "src/domain/users/repositories/abstract-users.repository";

@Injectable()
export class ShowUserByUserNameService implements AbstractShowUserByUserName {

	@Inject()
	private usersRepository: AbstractUsersRepository

	public async execute(user: string): Promise<UserTweets> {

		if (user.charAt(0) !== '@') {
			user = `@${user}`
		}

		const userExists = await this.usersRepository.checkUserName(user)

		if (!userExists) {
			throw new NotFoundError('User not found')
		}

		const userData = await this.usersRepository.showUserByUserName(user)

		return userData
	}

}
