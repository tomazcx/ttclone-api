import {Inject, Injectable} from "@nestjs/common";
import {User} from "src/domain/users/entities/User";
import {AbstractUsersRepository} from "src/domain/users/repositories/abstract-users.repository";
import {AbstractShowUsersByUserName} from "src/domain/users/services/abstract-show-users-by-user-name.service";

@Injectable()
export class ShowUsersByUserNameService implements AbstractShowUsersByUserName {

	@Inject()
	private usersRepository: AbstractUsersRepository

	public async execute(user: string): Promise<User[]> {
		const users = await this.usersRepository.showUsersByUserName(user)
		return users
	}

}
