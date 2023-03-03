import {IsNotEmpty, IsString} from "class-validator";

export class UpdatePasswordDto {

	@IsString()
	@IsNotEmpty()
	oldPassword: string

	@IsString()
	@IsNotEmpty()
	password: string

	@IsString()
	@IsNotEmpty()
	confirmPassword: string
}
