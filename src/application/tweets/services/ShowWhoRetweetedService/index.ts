import {Inject, Injectable} from "@nestjs/common";
import {UsersRepository} from "src/application/users/repositories/users.repository";
import {AbstractShowWhoRetweeted} from "src/domain/tweets/services/abstract-show-who-retweeted.service";
import {User} from "src/domain/users/entities/User";
import {TweetsRepository} from "../../repositories/tweets.repository";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'

@Injectable()
export class ShowWhoRetweetedService implements AbstractShowWhoRetweeted {

	@Inject()
	private usersRepository: UsersRepository

	@Inject()
	private tweetsRepository: TweetsRepository

	public async execute(tweetId: string): Promise<User[]> {
		const tweetExists = await this.tweetsRepository.checkId(tweetId)

		if (!tweetExists) {
			throw new NotFoundError('Tweet not found')
		}

		const users = await this.tweetsRepository.showWhoRetweeted(tweetId)

		return users
	}

}
