import {Inject, Injectable} from "@nestjs/common";
import {UsersRepository} from "src/application/users/repositories/users.repository";
import {AbstractToggleLikeTweet} from "src/domain/tweets/services/abstract-toggle-like-tweet.service";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {TweetsRepository} from "../../repositories/tweets.repository";

@Injectable()
export class ToggleLikeTweetService implements AbstractToggleLikeTweet {

	@Inject()
	private usersRepository: UsersRepository

	@Inject()
	private tweetsRepository: TweetsRepository

	public async execute(tweetId: string, userWhoLikesId: string): Promise<void> {
		const userExists = await this.usersRepository.checkId(userWhoLikesId)

		if (!userExists) {
			throw new NotFoundError('User not found')
		}

		const tweetExists = await this.tweetsRepository.checkId(tweetId)

		if (!tweetExists) {
			throw new NotFoundError('Tweet not found')
		}

		const theTweetHasBeenLiked = await this.tweetsRepository.verifyIfUserLiked(tweetId, userWhoLikesId)


		if (theTweetHasBeenLiked) {
			await this.tweetsRepository.removeLikeTweet(tweetId, userWhoLikesId)
			return
		}

		await this.tweetsRepository.likeTweet(tweetId, userWhoLikesId)
	}
}
