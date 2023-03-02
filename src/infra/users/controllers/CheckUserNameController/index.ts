import {Controller, Get, HttpCode, HttpStatus, Param} from "@nestjs/common";
import {CheckUserNameService} from "src/application/users/services/CheckUserNameService";

@Controller('users')
export class CheckUserNameController {

	constructor(
		private readonly checkUserNameService: CheckUserNameService
	) {}

	@Get('/isAvailable/:user')
	@HttpCode(HttpStatus.OK)
	async handle(@Param('user') user: string) {
		return await this.checkUserNameService.execute(user)
	}

}
