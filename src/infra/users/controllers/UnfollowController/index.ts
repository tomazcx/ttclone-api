import {Controller, HttpCode, HttpStatus, Param, Patch, UseGuards, Request} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {AbstractUnfollow} from "src/domain/users/services/abstract-unfollow.service";

@Controller('users')
export class UnfollowController {

	constructor(
		private readonly unfollowService: AbstractUnfollow
	) {}

	@Patch('/unfollow/:id')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.NO_CONTENT)
	async handle(@Param('id') id: string, @Request() req: any) {
		return await this.unfollowService.execute(id, req.user)
	}

}
