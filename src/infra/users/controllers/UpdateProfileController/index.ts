import {Body, Request, Controller, HttpCode, HttpStatus, Put, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {UpdateProfileDto} from "src/application/users/dto/update-profile.dto";
import {UpdateProfileService} from "src/application/users/services/UpdateProfileService";

@Controller('users')
export class UpdateProfileController {

	constructor(
		private readonly updateProfileService: UpdateProfileService
	) {}

	@Put()
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.OK)
	async handle(@Body() updateProfileDto: UpdateProfileDto, @Request() req: any) {
		return await this.updateProfileService.execute(updateProfileDto, req.user)
	}

}
