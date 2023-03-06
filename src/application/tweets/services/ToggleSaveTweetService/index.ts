import {Inject, Injectable} from "@nestjs/common";
import {UsersRepository} from "src/application/users/repositories/users.repository";
import {AbstractToggleSaveTweet} from "src/domain/tweets/services/abstract-toggle-save-tweet.service";
import {TweetsRepository} from "../../repositories/tweets.repository";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'


@Injectable()
export class ToggleSaveTweetService implements AbstractToggleSaveTweet {

	@Inject()
	private usersRepository: UsersRepository

	@Inject()
	private tweetsRepository: TweetsRepository

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
