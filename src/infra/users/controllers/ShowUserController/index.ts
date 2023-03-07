import {Controller, Get, HttpCode, HttpStatus, Param} from "@nestjs/common";
import {AbstractShowUser} from "src/domain/users/services/abstract-show-user.service";

@Controller('users')
export class ShowUserController {

	constructor(
		private readonly showUserService: AbstractShowUser
	) {}

	@Get('/:id')
	@HttpCode(HttpStatus.OK)
	async handle(@Param('id') id: string) {
		const user = await this.showUserService.execute(id)
		return user
	}

}
