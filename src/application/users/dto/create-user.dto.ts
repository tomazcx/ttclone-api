import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class CreateUserDto {

	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string

	@IsString()
	@IsNotEmpty()
	password: string

	@IsString()
	@IsNotEmpty()
	confirmPassword: string

	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	@IsNotEmpty()
	user: string


}
