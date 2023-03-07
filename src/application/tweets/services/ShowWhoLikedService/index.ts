import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {AbstractShowWhoLiked} from "src/domain/tweets/services/abstract-show-who-liked.service";
import {User} from "src/domain/users/entities/User";
import {AbstractTweetsRepository} from "src/domain/tweets/repositories/abstract-tweets.repository";

@Injectable()
export class ShowWhoLikedService implements AbstractShowWhoLiked {

	@Inject()
	private tweetsRepository: AbstractTweetsRepository

	public async execute(tweetId: string): Promise<User[]> {
		const tweetExists = await this.tweetsRepository.checkId(tweetId)

		if (!tweetExists) {
			throw new NotFoundError('Tweet not found')
		}

		const users = await this.tweetsRepository.showWhoLiked(tweetId)

		return users
	}

}
