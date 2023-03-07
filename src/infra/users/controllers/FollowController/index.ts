import {Controller, Request, HttpCode, HttpStatus, Param, Patch, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {AbstractFollow} from "src/domain/users/services/abstract-follow.service";

@Controller('users')
export class FollowController {

	constructor(
		private readonly followService: AbstractFollow
	) {}

	@Patch('/follow/:id')
	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(AuthGuard('jwt'))
	async handle(@Param('id') id: string, @Request() req: any) {
		await this.followService.execute(id, req.user)
	}

}
