import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {AbstractDeleteTweet} from "src/domain/tweets/services/abstract-delete-tweet.service";
import {BadRequestError} from "src/infra/common/errors/types/BadRequestError";
import {TweetsRepository} from "../../repositories/tweets.repository";
import {UsersRepository} from "src/application/users/repositories/users.repository";
import {ForbiddenError} from "src/infra/common/errors/types/ForbiddenError";

@Injectable()
export class DeleteTweetService implements AbstractDeleteTweet {

	@Inject()
	private readonly tweetsRepository: TweetsRepository

	@Inject()
	private readonly usersRepository: UsersRepository

	public async execute(id: string, authorId: string): Promise<void> {
		const tweetExists = await this.tweetsRepository.checkId(id)

		if (!tweetExists) {
			throw new NotFoundError("Tweet not found")
		}

		const authorExists = await this.usersRepository.checkId(authorId)

		if (!authorExists) {
			throw new NotFoundError("Author not found")
		}

		const belongsToTheAuthor = await this.tweetsRepository.verifyAuthor(id, authorId)

		if (!belongsToTheAuthor) {
			throw new ForbiddenError("You can't delete a tweet that you aren't the author")
		}

		await this.tweetsRepository.delete(id)
	}

}
