import {Inject, Injectable} from "@nestjs/common";
import {Tweet} from "src/domain/tweets/entities/Tweet";
import {AbstractTweetsRepository} from "src/domain/tweets/repositories/abstract-tweets.repository";
import {AbstractShowReplies} from "src/domain/tweets/services/abstract-show-replies.service";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'

@Injectable()
export class ShowRepliesService implements AbstractShowReplies {

	@Inject()
	private tweetsRepository: AbstractTweetsRepository

	public async execute(tweetId: string): Promise<Tweet[]> {
		const tweetExists = await this.tweetsRepository.checkId(tweetId)

		if (!tweetExists) {
			throw new NotFoundError('Tweet not found')
		}

		const replies = await this.tweetsRepository.showReplies(tweetId)
		return replies
	}

}
