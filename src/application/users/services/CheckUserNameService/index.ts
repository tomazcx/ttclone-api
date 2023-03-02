import {Inject, Injectable} from "@nestjs/common";
import {UserName} from "src/domain/users/entities/UserName";
import {AbstractCheckUserName} from "src/domain/users/services/abstract-check-user-name.service";
import {UsersRepository} from "../../repositories/users.repository";

@Injectable()
export class CheckUserNameService implements AbstractCheckUserName {

	@Inject()
	private usersRepository: UsersRepository

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
