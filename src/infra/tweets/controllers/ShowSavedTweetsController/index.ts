import {Controller, Get, HttpCode, HttpStatus, Request, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {AbstractShowSavedTweets} from "src/domain/tweets/services/abstract-show-saved-tweets.service";

@Controller('tweets')
export class ShowSavedTweetsController {

	constructor(
		private readonly showSavedTweetsService: AbstractShowSavedTweets
	) {}

	@Get('/save/all')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.OK)
	async handle(@Request() req: any) {
		return await this.showSavedTweetsService.execute(req.user)
	}

}

