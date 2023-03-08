import {Controller, Get, HttpCode, HttpStatus, Param} from "@nestjs/common";
import {AbstractShowUserByUserName} from "src/domain/users/services/abstract-show-user-by-user-name.service";

@Controller('users')
export class ShowUserByUserNameController {

	constructor(
		private showUserByUserNameService: AbstractShowUserByUserName
	) {}

	@Get('/user-name/:user')
	@HttpCode(HttpStatus.OK)
	async handle(@Param('user') user: string) {
		return await this.showUserByUserNameService.execute(user)
	}

}
