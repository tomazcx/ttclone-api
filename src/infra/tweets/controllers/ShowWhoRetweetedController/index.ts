import {Controller, Get, HttpCode, HttpStatus, Param} from "@nestjs/common";
import {AbstractShowWhoRetweeted} from "src/domain/tweets/services/abstract-show-who-retweeted.service";

@Controller('tweets')
export class ShowWhoRetweetedController {

	constructor(
		private readonly showWhoRetweetedService: AbstractShowWhoRetweeted
	) {}

	@Get('/retweet/:id')
	@HttpCode(HttpStatus.OK)
	async handle(@Param('id') id: string) {
		return await this.showWhoRetweetedService.execute(id)
	}

}
