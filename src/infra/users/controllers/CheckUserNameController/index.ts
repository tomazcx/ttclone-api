import {Controller, Get, HttpCode, HttpStatus, Param} from "@nestjs/common";
import {AbstractCheckUserName} from "src/domain/users/services/abstract-check-user-name.service";

@Controller('users')
export class CheckUserNameController {

	constructor(
		private readonly checkUserNameService: AbstractCheckUserName
	) {}

	@Get('/isAvailable/:user')
	@HttpCode(HttpStatus.OK)
	async handle(@Param('user') user: string) {
		return await this.checkUserNameService.execute(user)
	}

}
