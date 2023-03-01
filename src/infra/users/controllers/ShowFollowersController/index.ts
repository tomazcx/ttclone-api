import {Controller, Get, HttpCode, HttpStatus, Param} from "@nestjs/common";
import {ShowFollowersService} from "src/application/users/services/ShowFollowersService";

@Controller('users')
export class ShowFollowersController {

	constructor(
		private readonly showFollowersService: ShowFollowersService
	) {}

	@Get('/followers/:id')
	@HttpCode(HttpStatus.OK)
	async handle(@Param('id') id: string) {
		return await this.showFollowersService.execute(id)
	}

}
