import {IsString} from "class-validator";

export class UpdateProfileDto {

	@IsString()
	name?: string

	@IsString()
	desc?: string

	@IsString()
	localization?: string
}
