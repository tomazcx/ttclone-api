import {Inject, Injectable} from "@nestjs/common";
import {UserName} from "src/domain/users/entities/UserName";
import {AbstractUsersRepository} from "src/domain/users/repositories/abstract-users.repository";
import {AbstractCheckUserName} from "src/domain/users/services/abstract-check-user-name.service";

@Injectable()
export class CheckUserNameService implements AbstractCheckUserName {

	@Inject()
	private usersRepository: AbstractUsersRepository

	public async execute(user: string): Promise<UserName> {

		if (user.charAt(0) !== '@') {
			user = `@${user}`
		}

		const result = await this.usersRepository.checkUserName(user)

		return {
			user,
			available: !result
		}
	}

}
