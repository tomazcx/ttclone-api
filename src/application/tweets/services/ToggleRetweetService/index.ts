import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {AbstractToggleRetweet} from "src/domain/tweets/services/abstract-toggle-retweet.service";
import {AbstractUsersRepository} from "src/domain/users/repositories/abstract-users.repository";
import {AbstractTweetsRepository} from "src/domain/tweets/repositories/abstract-tweets.repository";

@Injectable()
export class ToggleRetweetService implements AbstractToggleRetweet {

	@Inject()
	private usersRepository: AbstractUsersRepository

	@Inject()
	private tweetsRepository: AbstractTweetsRepository

	public async execute(tweetId: string, userWhoRetweetsId: string): Promise<void> {
		const userExists = await this.usersRepository.checkId(userWhoRetweetsId)

		if (!userExists) {
			throw new NotFoundError('User not found')
		}

		const tweetExists = await this.tweetsRepository.checkId(tweetId)

		if (!tweetExists) {
			throw new NotFoundError('Tweet not found')
		}

		const hasBeenRetweeted = await this.tweetsRepository.verifyIfUserRetweeted(tweetId, userWhoRetweetsId)

		if (hasBeenRetweeted) {
			await this.tweetsRepository.removeRetweet(tweetId, userWhoRetweetsId)
			return
		}

		await this.tweetsRepository.retweet(tweetId, userWhoRetweetsId)

	}

}
