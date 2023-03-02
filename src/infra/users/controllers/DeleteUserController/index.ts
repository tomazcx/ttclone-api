import {Request, Controller, Delete, HttpCode, HttpStatus, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {DeleteUserService} from "src/application/users/services/DeleteUserService";

@Controller('users')
export class DeleteUserController {

	constructor(
		private readonly deleteUserService: DeleteUserService
	) {}

	@Delete()
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.NO_CONTENT)
	async handle(@Request() req: any) {
		return await this.deleteUserService.execute(req.user)
	}

}
