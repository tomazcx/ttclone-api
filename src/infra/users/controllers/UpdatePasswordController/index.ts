import {Body, Request, Controller, HttpCode, HttpStatus, Patch, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {UpdatePasswordDto} from "src/application/users/dto/update-password.dto";
import {AbstractUpdatePassword} from "src/domain/users/services/abstract-update-password.service";

@Controller('users')
export class UpdatePasswordController {

	constructor(
		private readonly updatePasswordService: AbstractUpdatePassword
	) {}

	@Patch('/password')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.OK)
	async handle(@Body() updatePasswordDto: UpdatePasswordDto, @Request() req: any) {
		return await this.updatePasswordService.execute(updatePasswordDto, req.user)
	}

}
