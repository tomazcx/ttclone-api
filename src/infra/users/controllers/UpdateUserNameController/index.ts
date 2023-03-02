import {Body, Request, Controller, HttpCode, HttpStatus, Param, Patch, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {UpdateUserNameDto} from "src/application/users/dto/update-user-name.dto";
import {UpdateUserNameService} from "src/application/users/services/UpdateUserNameService";

@Controller('users')
export class UpdateUserNameController {

	constructor(
		private readonly updateUserNameService: UpdateUserNameService
	) {}

	@Patch('user')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.OK)
	async handle(@Body() updateUserNameDto: UpdateUserNameDto, @Request() req: any) {
		return await this.updateUserNameService.execute(updateUserNameDto, req.user)
	}

}
