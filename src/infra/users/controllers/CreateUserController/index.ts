import {Body, Controller, HttpCode, HttpStatus, Post} from "@nestjs/common";
import {CreateUserDto} from "src/application/users/dto/create-user.dto";
import {AbstractCreateUser} from "src/domain/users/services/abstract-create-user.service";

@Controller('users')
export class CreateUserController {

	constructor(private readonly createUserService: AbstractCreateUser) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async handle(@Body() createUserDto: CreateUserDto) {
		const result = await this.createUserService.execute(createUserDto)
		return result
	}

}
