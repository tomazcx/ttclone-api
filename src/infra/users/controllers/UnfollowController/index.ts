import {Controller, HttpCode, HttpStatus, Param, Patch, UseGuards, Request} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {UnfollowService} from "src/application/users/services/UnfollowService";

@Controller('users')
export class UnfollowController {

	constructor(
		private readonly unfollowService: UnfollowService
	) {}

	@Patch('/unfollow/:id')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.NO_CONTENT)
	async handle(@Param('id') id: string, @Request() req: any) {
		return await this.unfollowService.execute(id, req.user)
	}

}
