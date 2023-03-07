import {Controller, Request, HttpCode, HttpStatus, Param, Put, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {AbstractToggleRetweet} from "src/domain/tweets/services/abstract-toggle-retweet.service";

@Controller('tweets')
export class ToggleRetweetController {

	constructor(
		private toggleRetweetService: AbstractToggleRetweet
	) {}

	@Put('/retweet/:id')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.NO_CONTENT)
	async handle(@Param('id') id: string, @Request() req: any) {
		return await this.toggleRetweetService.execute(id, req.user)
	}

}
