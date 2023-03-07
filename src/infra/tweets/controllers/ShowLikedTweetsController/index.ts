import {Controller, Get, HttpCode, HttpStatus, Param} from "@nestjs/common";
import {AbstractShowLikedTweets} from "src/domain/tweets/services/abstract-show-liked-tweets.service";

@Controller('tweets')
export class ShowLikedTweetsController {

	constructor(
		private readonly showLikedTweetsService: AbstractShowLikedTweets
	) {}

	@Get('/like/all/:id')
	@HttpCode(HttpStatus.OK)
	async handle(@Param('id') id: string) {
		return await this.showLikedTweetsService.execute(id)
	}

}
