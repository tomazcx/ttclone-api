import {Controller, Get, HttpCode, HttpStatus, Param} from "@nestjs/common";
import {AbstractShowUsersByUserName} from "src/domain/users/services/abstract-show-users-by-user-name.service";

@Controller('users')
export class ShowUsersByUserNameController {

	constructor(
		private readonly showUsersByUserNameService: AbstractShowUsersByUserName
	) {}

	@Get('/search/:user')
	@HttpCode(HttpStatus.OK)
	async handle(@Param('user') user: string) {
		return await this.showUsersByUserNameService.execute(user)
	}
}
