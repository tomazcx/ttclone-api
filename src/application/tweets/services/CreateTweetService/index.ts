import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {UsersRepository} from "src/application/users/repositories/users.repository";
import {Tweet} from "src/domain/tweets/entities/Tweet";
import {AbstractCreateTweet} from "src/domain/tweets/services/abstract-create-tweet.service";
import {CreateTweetDto} from "../../dto/create-tweet.dto";
import {TweetsRepository} from "../../repositories/tweets.repository";

@Injectable()
export class CreateTweetService implements AbstractCreateTweet {

	@Inject()
	private tweetsRepository: TweetsRepository

	@Inject()
	private usersRepository: UsersRepository

	public async execute(createTweetDto: CreateTweetDto, authorId: string): Promise<Tweet> {
		const authorExists = await this.usersRepository.checkId(authorId)

		if (!authorExists) {
			throw new NotFoundError('Author not found.')
		}

		const tweet = await this.tweetsRepository.create(createTweetDto, authorId)
		return tweet
	}

}
