import {Controller, Get, HttpCode, HttpStatus, Request, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {ShowSavedTweetsService} from "src/application/tweets/services/ShowSavedTweetsService";

@Controller('tweets')
export class ShowSavedTweetsController {

	constructor(
		private readonly showSavedTweetsService: ShowSavedTweetsService
	) {}

	@Get('/save/all')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.OK)
	async handle(@Request() req: any) {
		return await this.showSavedTweetsService.execute(req.user)
	}

}

