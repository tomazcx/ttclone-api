import {Controller, Get, HttpCode, HttpStatus, Param} from "@nestjs/common";
import {AbstractShowFollowers} from "src/domain/users/services/abstract-show-followers.service";

@Controller('users')
export class ShowFollowersController {

	constructor(
		private readonly showFollowersService: AbstractShowFollowers
	) {}

	@Get('/followers/:id')
	@HttpCode(HttpStatus.OK)
	async handle(@Param('id') id: string) {
		return await this.showFollowersService.execute(id)
	}

}
