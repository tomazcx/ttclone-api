import {Body, Request, Controller, HttpCode, HttpStatus, Param, Patch, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {UpdateUserNameDto} from "src/application/users/dto/update-user-name.dto";
import {AbstractUpdateUserName} from "src/domain/users/services/abstract-update-user-name.service";

@Controller('users')
export class UpdateUserNameController {

	constructor(
		private readonly updateUserNameService: AbstractUpdateUserName
	) {}

	@Patch('user')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.OK)
	async handle(@Body() updateUserNameDto: UpdateUserNameDto, @Request() req: any) {
		return await this.updateUserNameService.execute(updateUserNameDto, req.user)
	}

}
