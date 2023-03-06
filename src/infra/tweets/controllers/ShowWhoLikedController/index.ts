import {Controller, Get, HttpCode, HttpStatus, Param} from "@nestjs/common";
import {ShowWhoLikedService} from "src/application/tweets/services/ShowWhoLikedService";

@Controller('tweets')
export class ShowWhoLikedController {

	constructor(
		private readonly showWhoLikedService: ShowWhoLikedService
	) {}

	@Get('/like/:id')
	@HttpCode(HttpStatus.OK)
	async handle(@Param('id') id: string) {
		return await this.showWhoLikedService.execute(id)
	}

}
