import {Controller, Get, HttpCode, HttpStatus, Param} from "@nestjs/common";
import {ShowLikedTweetsService} from "src/application/tweets/services/ShowLikedTweetsService";

@Controller('tweets')
export class ShowLikedTweetsController {

	constructor(
		private readonly showLikedTweetsService: ShowLikedTweetsService
	) {}

	@Get('/like/all/:id')
	@HttpCode(HttpStatus.OK)
	async handle(@Param('id') id: string) {
		return await this.showLikedTweetsService.execute(id)
	}

}
