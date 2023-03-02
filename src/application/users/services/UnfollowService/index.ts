import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError";
import {AbstractUnfollow} from "src/domain/users/services/abstract-unfollow.service";
import {UnprocessableEntityError} from "src/infra/common/errors/types/UnprocessableEntityError";
import {UsersRepository} from "../../repositories/users.repository";
import {BadRequestError} from "src/infra/common/errors/types/BadRequestError";

@Injectable()
export class UnfollowService implements AbstractUnfollow {

	@Inject()
	private usersRepository: UsersRepository

	public async execute(userToUnfollowId: string, unfollowerId: string): Promise<void> {
		if (userToUnfollowId === unfollowerId) {
			throw new UnprocessableEntityError("Can't unfollow yourself")
		}

		const userToUnfollow = await this.usersRepository.checkId(userToUnfollowId)

		if (!userToUnfollow) {
			throw new NotFoundError('User to unfollow not found')
		}

		const unfollower = await this.usersRepository.checkId(unfollowerId)

		if (!unfollower) {
			throw new NotFoundError('User that would unfollow not found')
		}

		const isFollowingUser = await this.usersRepository.verifyUserFollowing(unfollowerId, userToUnfollowId)

		if (!isFollowingUser) {
			throw new BadRequestError("You can't unfollow someone you are not following")
		}

		await this.usersRepository.unfollow(userToUnfollowId, unfollowerId)
	}


}
