import {Inject, Injectable} from "@nestjs/common";
import {AbstractShowWhoRetweeted} from "src/domain/tweets/services/abstract-show-who-retweeted.service";
import {User} from "src/domain/users/entities/User";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {AbstractTweetsRepository} from "src/domain/tweets/repositories/abstract-tweets.repository";

@Injectable()
export class ShowWhoRetweetedService implements AbstractShowWhoRetweeted {

	@Inject()
	private tweetsRepository: AbstractTweetsRepository

	public async execute(tweetId: string): Promise<User[]> {
		const tweetExists = await this.tweetsRepository.checkId(tweetId)

		if (!tweetExists) {
			throw new NotFoundError('Tweet not found')
		}

		const users = await this.tweetsRepository.showWhoRetweeted(tweetId)

		return users
	}

}
