import {Controller, Request, HttpCode, HttpStatus, Param, UseGuards, Put} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {ToggleLikeTweetService} from "src/application/tweets/services/ToggleLikeTweetService";

@Controller('tweets')
export class ToggleLikeTweetController {

	constructor(
		private readonly likeTweetService: ToggleLikeTweetService
	) {}

	@Put('/like/:id')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.NO_CONTENT)
	async handle(@Param('id') id: string, @Request() req: any) {
		return await this.likeTweetService.execute(id, req.user)
	}

}
