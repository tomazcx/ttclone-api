import {Controller, Get, HttpCode, HttpStatus, Param} from "@nestjs/common";
import {AbstractShowWhoLiked} from "src/domain/tweets/services/abstract-show-who-liked.service";

@Controller('tweets')
export class ShowWhoLikedController {

	constructor(
		private readonly showWhoLikedService: AbstractShowWhoLiked
	) {}

	@Get('/like/:id')
	@HttpCode(HttpStatus.OK)
	async handle(@Param('id') id: string) {
		return await this.showWhoLikedService.execute(id)
	}

}
