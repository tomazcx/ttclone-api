import {Request, Controller, Delete, HttpCode, HttpStatus, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {AbstractDeleteUser} from "src/domain/users/services/abstract-delete-user.service";

@Controller('users')
export class DeleteUserController {

	constructor(
		private readonly deleteUserService: AbstractDeleteUser
	) {}

	@Delete()
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.NO_CONTENT)
	async handle(@Request() req: any) {
		return await this.deleteUserService.execute(req.user)
	}

}
