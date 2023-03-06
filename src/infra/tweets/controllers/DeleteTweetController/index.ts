import {Controller, Request, Delete, HttpCode, HttpStatus, Param, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {DeleteTweetService} from "src/application/tweets/services/DeleteTweetService";

@Controller('tweets')
export class DeleteTweetController {

	constructor(
		private readonly deleteTweetService: DeleteTweetService
	) {}

	@Delete('/:id')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.NO_CONTENT)
	async handle(@Param('id') id: string, @Request() req: any) {
		await this.deleteTweetService.execute(id, req.user)
	}

}
