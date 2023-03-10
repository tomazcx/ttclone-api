import {Inject, Injectable} from "@nestjs/common";
import {Tweet} from "src/domain/tweets/entities/Tweet";
import {AbstractTweetsRepository} from "src/domain/tweets/repositories/abstract-tweets.repository";
import {AbstractReplyTweet} from "src/domain/tweets/services/abstract-reply-tweet.service";
import {AbstractUsersRepository} from "src/domain/users/repositories/abstract-users.repository";
import {CreateTweetDto} from "../../dto/create-tweet.dto";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'

@Injectable()
export class ReplyTweetService implements AbstractReplyTweet {

	@Inject()
	private usersRepository: AbstractUsersRepository

	@Inject()
	private tweetsRepository: AbstractTweetsRepository

	public async execute(createTweetDto: CreateTweetDto, tweetId: string, authorId: string): Promise<Tweet> {
		const userExists = await this.usersRepository.checkId(authorId)

		if (!userExists) {
			throw new NotFoundError('User not found')
		}

		const tweetExists = await this.tweetsRepository.checkId(tweetId)

		if (!tweetExists) {
			throw new NotFoundError('Tweet not found')
		}

		const tweet = await this.tweetsRepository.replyTweet(tweetId, authorId, createTweetDto)

		return tweet
	}


}
