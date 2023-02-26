import {Inject, Injectable} from "@nestjs/common";
import {User} from "src/domain/users/entities/User";
import {AbstractShowUsersByUserName} from "src/domain/users/services/abstract-show-users-by-user-name.service";
import {UsersRepository} from "../../repositories/users.repository";

@Injectable()
export class ShowUsersByUserNameService implements AbstractShowUsersByUserName {

	@Inject()
	private usersRepository: UsersRepository

	public async execute(user: string): Promise<User[]> {
		const users = await this.usersRepository.showUsersByUserName(user)
		return users
	}

}
