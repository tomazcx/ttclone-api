import {Controller, Get, HttpCode, HttpStatus, Param} from "@nestjs/common";
import {AbstractShowUserTweets} from "src/domain/tweets/services/abstract-show-user-tweets.service";

@Controller('/tweets')
export class ShowUserTweetsController {

	constructor(
		private readonly showUserTweetsService: AbstractShowUserTweets
	) {}

	@Get('/user/:id')
	@HttpCode(HttpStatus.OK)
	async handle(@Param('id') id: string) {
		return await this.showUserTweetsService.execute(id)
	}

}
