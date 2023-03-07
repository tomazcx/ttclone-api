import {Controller, Get, HttpCode, HttpStatus, Param} from "@nestjs/common";
import {AbstractShowTweet} from "src/domain/tweets/services/abstract-show-tweet.service";

@Controller('tweets')
export class ShowTweetController {

	constructor(
		private readonly showTweetService: AbstractShowTweet
	) {}

	@Get('/:id')
	@HttpCode(HttpStatus.OK)
	async handle(@Param('id') id: string) {
		return await this.showTweetService.execute(id)
	}

}
