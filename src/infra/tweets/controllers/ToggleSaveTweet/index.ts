import {Request, Controller, HttpCode, HttpStatus, Put, UseGuards, Param} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {AbstractToggleSaveTweet} from "src/domain/tweets/services/abstract-toggle-save-tweet.service";

@Controller('tweets')
export class ToggleSaveTweetController {

	constructor(
		private readonly toggleSaveTweetService: AbstractToggleSaveTweet
	) {}

	@Put('/save/:id')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.NO_CONTENT)
	async handle(@Param('id') id: string, @Request() req: any) {
		return await this.toggleSaveTweetService.execute(id, req.user)
	}

}
