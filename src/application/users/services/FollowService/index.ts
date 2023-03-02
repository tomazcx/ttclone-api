import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError";
import {AbstractFollow} from "src/domain/users/services/abstract-follow.service";
import {UsersRepository} from "../../repositories/users.repository";
import {UnprocessableEntityError} from "src/infra/common/errors/types/UnprocessableEntityError";
import {BadRequestError} from "src/infra/common/errors/types/BadRequestError";

@Injectable()
export class FollowService implements AbstractFollow {

	@Inject()
	private usersRepository: UsersRepository

	public async execute(userToFollowId: string, followerId: string): Promise<void> {

		if (userToFollowId === followerId) {
			throw new UnprocessableEntityError("Can't follow your own account")
		}

		const userToFollow = await this.usersRepository.checkId(userToFollowId)
		const follower = await this.usersRepository.checkId(followerId)

		if (!userToFollow) {
			throw new NotFoundError('User to follow not found')
		}

		if (!follower) {
			throw new NotFoundError('User not found')
		}

		const isFollowingUser = await this.usersRepository.verifyUserFollowing(followerId, userToFollowId)

		if (isFollowingUser) {
			throw new BadRequestError('You cannot follow someone you are already following')
		}

		await this.usersRepository.follow(userToFollowId, followerId)
	}

}
