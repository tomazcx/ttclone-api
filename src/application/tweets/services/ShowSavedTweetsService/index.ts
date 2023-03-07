import {Inject, Injectable} from "@nestjs/common";
import {Tweet} from "src/domain/tweets/entities/Tweet";
import {AbstractShowSavedTweets} from "src/domain/tweets/services/abstract-show-saved-tweets.service";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {AbstractUsersRepository} from "src/domain/users/repositories/abstract-users.repository";
import {AbstractTweetsRepository} from "src/domain/tweets/repositories/abstract-tweets.repository";

@Injectable()
export class ShowSavedTweetsService implements AbstractShowSavedTweets {

	@Inject()
	private usersRepository: AbstractUsersRepository

	@Inject()
	private tweetsRepository: AbstractTweetsRepository

	public async execute(userId: string): Promise<Tweet[]> {
		const userExists = await this.usersRepository.checkId(userId)

		if (!userExists) {
			throw new NotFoundError('User not found')
		}

		const tweets = await this.tweetsRepository.showSavedTweets(userId)
		return tweets
	}

}
