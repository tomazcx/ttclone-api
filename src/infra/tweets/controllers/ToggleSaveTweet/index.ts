import {Request, Controller, HttpCode, HttpStatus, Put, UseGuards, Param} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {ToggleSaveTweetService} from "src/application/tweets/services/ToggleSaveTweetService";

@Controller('tweets')
export class ToggleSaveTweetController {

	constructor(
		private readonly toggleSaveTweetService: ToggleSaveTweetService
	) {}

	@Put('/save/:id')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.NO_CONTENT)
	async handle(@Param('id') id: string, @Request() req: any) {
		return await this.toggleSaveTweetService.execute(id, req.user)
	}

}
