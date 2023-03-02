import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError";
import {User} from "src/domain/users/entities/User";
import {AbstractShowUser} from "src/domain/users/services/abstract-show-user.service";
import {UsersRepository} from "../../repositories/users.repository";

@Injectable()
export class ShowUserService implements AbstractShowUser {

	@Inject()
	private usersRepository: UsersRepository

	public async execute(id: string): Promise<User> {
		const user = await this.usersRepository.checkId(id)

		if (!user) {
			throw new NotFoundError("User not found.")
		}

		return await this.usersRepository.showUser(id)
	}

}
