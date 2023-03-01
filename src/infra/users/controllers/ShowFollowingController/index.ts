import {Controller, Get, HttpCode, HttpStatus, Param} from "@nestjs/common";
import {ShowFollowingService} from "src/application/users/services/ShowFollowingService";

@Controller('users')
export class ShowFollowingController {

	constructor(
		private readonly showFollowingService: ShowFollowingService
	) {}

	@Get('/following/:id')
	@HttpCode(HttpStatus.OK)
	async handle(@Param('id') id: string) {
		return await this.showFollowingService.execute(id)
	}
}
