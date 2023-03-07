import {Inject, Injectable} from "@nestjs/common";
import {Tweet} from "src/domain/tweets/entities/Tweet";
import {AbstractShowTweet} from "src/domain/tweets/services/abstract-show-tweet.service";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {AbstractTweetsRepository} from "src/domain/tweets/repositories/abstract-tweets.repository";

@Injectable()
export class ShowTweetService implements AbstractShowTweet {

	@Inject()
	private tweetsRepository: AbstractTweetsRepository

	public async execute(id: string): Promise<Tweet> {
		const tweetExists = await this.tweetsRepository.checkId(id)

		if (!tweetExists) {
			throw new NotFoundError('Tweet not found')
		}

		const tweet = await this.tweetsRepository.showTweet(id)

		return tweet
	}

}
