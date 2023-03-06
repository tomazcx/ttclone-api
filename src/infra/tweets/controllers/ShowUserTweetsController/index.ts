import {Controller, Get, HttpCode, HttpStatus, Param} from "@nestjs/common";
import {ShowUserTweetsService} from "src/application/tweets/services/ShowUserTweetsService";

@Controller('/tweets')
export class ShowUserTweetsController {

	constructor(
		private readonly showUserTweetsService: ShowUserTweetsService
	) {}

	@Get('/user/:id')
	@HttpCode(HttpStatus.OK)
	async handle(@Param('id') id: string) {
		return await this.showUserTweetsService.execute(id)
	}

}
