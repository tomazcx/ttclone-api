import {Body, Controller, HttpCode, HttpStatus, Post} from "@nestjs/common";
import {CreateUserDto} from "src/application/users/dto/create-user.dto";
import {CreateUserService} from "src/application/users/services/CreateUserService";

@Controller('users')
export class CreateUserController {

	constructor(private readonly createUserService: CreateUserService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async handle(@Body() createUserDto: CreateUserDto) {
		const result = await this.createUserService.execute(createUserDto)
		return result
	}

}
