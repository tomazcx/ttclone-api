import {Inject, Injectable} from "@nestjs/common";
import {AbstractToggleSaveTweet} from "src/domain/tweets/services/abstract-toggle-save-tweet.service";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {AbstractUsersRepository} from "src/domain/users/repositories/abstract-users.repository";
import {AbstractTweetsRepository} from "src/domain/tweets/repositories/abstract-tweets.repository";


@Injectable()
export class ToggleSaveTweetService implements AbstractToggleSaveTweet {

	@Inject()
	private usersRepository: AbstractUsersRepository

	@Inject()
	private tweetsRepository: AbstractTweetsRepository

	public async execute(tweetId: string, userWhoSaveId: string): Promise<void> {
		const userExists = await this.usersRepository.checkId(userWhoSaveId)

		if (!userExists) {
			throw new NotFoundError('User not found')
		}

		const tweetExists = await this.tweetsRepository.checkId(tweetId)

		if (!tweetExists) {
			throw new NotFoundError('Tweet not found')
		}

		const theTweetHasBeenSaved = await this.tweetsRepository.verifyIfUserSaved(tweetId, userWhoSaveId)

		if (theTweetHasBeenSaved) {
			await this.tweetsRepository.removeSavedTweet(tweetId, userWhoSaveId)
			return
		}

		await this.tweetsRepository.saveTweet(tweetId, userWhoSaveId)
	}

}
