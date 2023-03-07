import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {AbstractDeleteTweet} from "src/domain/tweets/services/abstract-delete-tweet.service";
import {ForbiddenError} from "src/infra/common/errors/types/ForbiddenError";
import {AbstractTweetsRepository} from "src/domain/tweets/repositories/abstract-tweets.repository";
import {AbstractUsersRepository} from "src/domain/users/repositories/abstract-users.repository";

@Injectable()
export class DeleteTweetService implements AbstractDeleteTweet {

	@Inject()
	private readonly tweetsRepository: AbstractTweetsRepository

	@Inject()
	private readonly usersRepository: AbstractUsersRepository

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
