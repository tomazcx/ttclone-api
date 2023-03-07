import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {Tweet} from "src/domain/tweets/entities/Tweet";
import {AbstractShowLikedTweets} from "src/domain/tweets/services/abstract-show-liked-tweets.service";
import {AbstractUsersRepository} from "src/domain/users/repositories/abstract-users.repository";
import {AbstractTweetsRepository} from "src/domain/tweets/repositories/abstract-tweets.repository";

@Injectable()
export class ShowLikedTweetsService implements AbstractShowLikedTweets {

	@Inject()
	private usersRepository: AbstractUsersRepository

	@Inject()
	private tweetsRepository: AbstractTweetsRepository

	public async execute(userId: string): Promise<Tweet[]> {
		const userExists = await this.usersRepository.checkId(userId)

		if (!userExists) {
			throw new NotFoundError('User not found')
		}

		const tweets = await this.tweetsRepository.showLikedTweets(userId)

		return tweets
	}

}
