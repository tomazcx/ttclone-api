import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError";
import {AbstractFollow} from "src/domain/users/services/abstract-follow.service";
import {UsersRepository} from "../../repositories/users.repository";
import {UnprocessableEntityError} from "src/infra/common/errors/types/UnprocessableEntityError";

@Injectable()
export class FollowService implements AbstractFollow {

	@Inject()
	private usersRepository: UsersRepository

	public async execute(userToFollowId: string, followerId: string): Promise<void> {

		if (userToFollowId === followerId) {
			throw new UnprocessableEntityError("Can't follow your own account")
		}

		const userToFollow = await this.usersRepository.showUser(userToFollowId)
		const follower = await this.usersRepository.showUser(followerId)

		if (!userToFollow) {
			throw new NotFoundError('User to follow not found')
		}

		if (!follower) {
			throw new NotFoundError('User not found')
		}


		await this.usersRepository.follow(userToFollowId, followerId)
	}

}
