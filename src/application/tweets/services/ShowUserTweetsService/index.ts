import {Inject, Injectable} from "@nestjs/common";
import {UsersRepository} from "src/application/users/repositories/users.repository";
import {Tweet} from "src/domain/tweets/entities/Tweet";
import {AbstractShowUserTweets} from "src/domain/tweets/services/abstract-show-user-tweets.service";
import {TweetsRepository} from "../../repositories/tweets.repository";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'

@Injectable()
export class ShowUserTweetsService implements AbstractShowUserTweets {

	@Inject()
	private usersRepository: UsersRepository

	@Inject()
	private tweetsRepository: TweetsRepository

	public async execute(userId: string): Promise<Tweet[]> {
		const userExists = await this.usersRepository.checkId(userId)

		if (!userExists) {
			throw new NotFoundError('User not found.')
		}

		const tweets = await this.tweetsRepository.showUserTweets(userId)

		return tweets
	}

}
