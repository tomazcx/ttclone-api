import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {Tweet} from "src/domain/tweets/entities/Tweet";
import {AbstractCreateTweet} from "src/domain/tweets/services/abstract-create-tweet.service";
import {CreateTweetDto} from "../../dto/create-tweet.dto";
import {AbstractTweetsRepository} from "src/domain/tweets/repositories/abstract-tweets.repository";
import {AbstractUsersRepository} from "src/domain/users/repositories/abstract-users.repository";

@Injectable()
export class CreateTweetService implements AbstractCreateTweet {

	@Inject()
	private tweetsRepository: AbstractTweetsRepository

	@Inject()
	private usersRepository: AbstractUsersRepository

	public async execute(createTweetDto: CreateTweetDto, authorId: string): Promise<Tweet> {
		const authorExists = await this.usersRepository.checkId(authorId)

		if (!authorExists) {
			throw new NotFoundError('Author not found.')
		}

		const tweet = await this.tweetsRepository.create(createTweetDto, authorId)
		return tweet
	}

}
