import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {UsersRepository} from "src/application/users/repositories/users.repository";
import {Tweet} from "src/domain/tweets/entities/Tweet";
import {AbstractShowLikedTweets} from "src/domain/tweets/services/abstract-show-liked-tweets.service";
import {TweetsRepository} from "../../repositories/tweets.repository";

@Injectable()
export class ShowLikedTweetsService implements AbstractShowLikedTweets {

	@Inject()
	private usersRepository: UsersRepository

	@Inject()
	private tweetsRepository: TweetsRepository

	public async execute(userId: string): Promise<Tweet[]> {
		const userExists = await this.usersRepository.checkId(userId)

		if (!userExists) {
			throw new NotFoundError('User not found')
		}

		const tweets = await this.tweetsRepository.showLikedTweets(userId)

		return tweets
	}

}
