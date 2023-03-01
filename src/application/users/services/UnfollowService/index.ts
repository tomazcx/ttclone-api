import {Injectable} from "@nestjs/common";
import {AbstractUnfollow} from "src/domain/users/services/abstract-unfollow.service";
import {UnprocessableEntityError} from "src/infra/common/errors/types/UnprocessableEntityError";

@Injectable()
export class UnfollowService implements AbstractUnfollow {

	public async execute(userToUnfollowId: string, unfollowerId: string): Promise<void> {
		if (userToUnfollowId === unfollowerId) {
			throw new UnprocessableEntityError()
		}
	}


}
