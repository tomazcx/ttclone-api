import {Controller, Request, HttpCode, HttpStatus, Param, Patch, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {FollowService} from "src/application/users/services/FollowService";

@Controller('users')
export class FollowController {

	constructor(
		private readonly followService: FollowService
	) {}

	@Patch('/follow/:id')
	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(AuthGuard('jwt'))
	async handle(@Param('id') id: string, @Request() req: any) {
		await this.followService.execute(id, req.user)
	}

}
