import {IsString} from "class-validator";

export class UpdateProfileDto {

	@IsString()
	name: string

	@IsString()
	description: string

	@IsString()
	localization: string
}
