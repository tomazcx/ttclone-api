import {Controller, Get, HttpCode, HttpStatus, Param} from "@nestjs/common";
import {ShowTweetService} from "src/application/tweets/services/ShowTweetService";

@Controller('tweets')
export class ShowTweetController {

	constructor(
		private readonly showTweetService: ShowTweetService
	) {}

	@Get('/:id')
	@HttpCode(HttpStatus.OK)
	async handle(@Param('id') id: string) {
		return await this.showTweetService.execute(id)
	}

}
