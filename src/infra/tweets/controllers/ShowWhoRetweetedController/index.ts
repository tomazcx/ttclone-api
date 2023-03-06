import {Controller, Get, HttpCode, HttpStatus, Param} from "@nestjs/common";
import {ShowWhoRetweetedService} from "src/application/tweets/services/ShowWhoRetweetedService";

@Controller('tweets')
export class ShowWhoRetweetedController {

	constructor(
		private readonly showWhoRetweetedService: ShowWhoRetweetedService
	) {}

	@Get('/retweet/:id')
	@HttpCode(HttpStatus.OK)
	async handle(@Param('id') id: string) {
		return await this.showWhoRetweetedService.execute(id)
	}

}
