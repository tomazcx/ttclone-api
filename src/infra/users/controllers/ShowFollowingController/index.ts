import {Controller, Get, HttpCode, HttpStatus, Param} from "@nestjs/common";
import {AbstractShowFollowing} from "src/domain/users/services/abstract-show-following.service";

@Controller('users')
export class ShowFollowingController {

	constructor(
		private readonly showFollowingService: AbstractShowFollowing
	) {}

	@Get('/following/:id')
	@HttpCode(HttpStatus.OK)
	async handle(@Param('id') id: string) {
		return await this.showFollowingService.execute(id)
	}
}
