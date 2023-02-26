import {Controller, Get, HttpCode, HttpStatus, Param} from "@nestjs/common";
import {ShowUserService} from "src/application/users/services/ShowUserService";

@Controller('users')
export class ShowUserController {

	constructor(
		private readonly showUserService: ShowUserService
	) {}

	@Get('/:id')
	@HttpCode(HttpStatus.OK)
	async handle(@Param('id') id: string) {
		const user = await this.showUserService.execute(id)
		return user
	}

}
