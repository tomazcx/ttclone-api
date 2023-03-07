import {Body, Request, Controller, HttpCode, HttpStatus, Put, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {UpdateProfileDto} from "src/application/users/dto/update-profile.dto";
import {AbstractUpdateProfile} from "src/domain/users/services/abstract-update-profile.service";

@Controller('users')
export class UpdateProfileController {

	constructor(
		private readonly updateProfileService: AbstractUpdateProfile
	) {}

	@Put()
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.OK)
	async handle(@Body() updateProfileDto: UpdateProfileDto, @Request() req: any) {
		return await this.updateProfileService.execute(updateProfileDto, req.user)
	}

}
