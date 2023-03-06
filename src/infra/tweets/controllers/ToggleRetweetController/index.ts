import {Controller, Request, HttpCode, HttpStatus, Param, Put, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {get} from "http";
import {ToggleRetweetService} from "src/application/tweets/services/ToggleRetweetService";

@Controller('tweets')
export class ToggleRetweetController {

	constructor(
		private toggleRetweetService: ToggleRetweetService
	) {}

	@Put('/retweet/:id')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.NO_CONTENT)
	async handle(@Param('id') id: string, @Request() req: any) {
		return await this.toggleRetweetService.execute(id, req.user)
	}

}
