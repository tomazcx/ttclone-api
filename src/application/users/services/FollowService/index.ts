import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError";
import {AbstractFollow} from "src/domain/users/services/abstract-follow.service";
import {UsersRepository} from "../../repositories/users.repository";

@Injectable()
export class FollowService implements AbstractFollow {

	@Inject()
	private usersRepository: UsersRepository

	public async execute(id: string): Promise<void> {
		const user = await this.usersRepository.showUser(id)

		if (!user) {
			throw new NotFoundError('User not found')
		}
	}

}
