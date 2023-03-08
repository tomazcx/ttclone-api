import {Inject, Injectable} from "@nestjs/common";
import {Tweet} from "src/domain/tweets/entities/Tweet";
import {AbstractTweetsRepository} from "src/domain/tweets/repositories/abstract-tweets.repository";
import {AbstractRetweetWithComment} from "src/domain/tweets/services/abstract-retweet-with-comment.service";
import {AbstractUsersRepository} from "src/domain/users/repositories/abstract-users.repository";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {CreateTweetDto} from "../../dto/create-tweet.dto";

@Injectable()
export class RetweetWithCommentService implements AbstractRetweetWithComment {

	@Inject()
	private tweetsRepository: AbstractTweetsRepository

	@Inject()
	private usersRepository: AbstractUsersRepository

	public async execute(createTweetDto: CreateTweetDto, tweetId: string, userWhoRetweetsId: string): Promise<Tweet> {
		const userExists = await this.usersRepository.checkId(userWhoRetweetsId)

		if (!userExists) {
			throw new NotFoundError('User not found')
		}

		const tweetExists = await this.tweetsRepository.checkId(tweetId)

		if (!tweetExists) {
			throw new NotFoundError('Tweet not found')
		}

		const tweet = await this.tweetsRepository.retweetWithComment(createTweetDto, tweetId, userWhoRetweetsId)

		return tweet
	}



}
