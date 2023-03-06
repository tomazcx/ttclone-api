import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {UsersRepository} from "src/application/users/repositories/users.repository";
import {AbstractToggleRetweet} from "src/domain/tweets/services/abstract-toggle-retweet.service";
import {TweetsRepository} from "../../repositories/tweets.repository";

@Injectable()
export class ToggleRetweetService implements AbstractToggleRetweet {

	@Inject()
	private usersRepository: UsersRepository

	@Inject()
	private tweetsRepository: TweetsRepository

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

		console.log(hasBeenRetweeted)

		if (hasBeenRetweeted) {
			await this.tweetsRepository.removeRetweet(tweetId, userWhoRetweetsId)
			return
		}

		await this.tweetsRepository.retweet(tweetId, userWhoRetweetsId)

	}

}
