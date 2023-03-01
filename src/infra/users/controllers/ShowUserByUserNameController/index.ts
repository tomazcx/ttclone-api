import {Controller, Get, HttpCode, HttpStatus, Param} from "@nestjs/common";
import {ShowUsersByUserNameService} from "src/application/users/services/ShowUsersByUserNameService";

@Controller('users')
export class ShowUsersByUserNameController {

	constructor(
		private readonly showUsersByUserNameService: ShowUsersByUserNameService
	) {}

	@Get('/search/:user')
	@HttpCode(HttpStatus.OK)
	async handle(@Param('user') user: string) {
		return await this.showUsersByUserNameService.execute(user)
	}
}
