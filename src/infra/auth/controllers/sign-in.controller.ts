import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {SignInDto} from 'src/application/auth/dto/sign-in.dto';
import {SignInService} from 'src/application/auth/services/SignInService';

@Controller('auth')
export class SignInController {

	constructor(
		private readonly signInService: SignInService
	) {}

	@Post()
	@HttpCode(HttpStatus.OK)
	async handle(@Body() signInDto: SignInDto) {
		const token = await this.signInService.execute(signInDto)
		return {
			status: 'Authenticated',
			token,
			timestamp: new Date()
		}
	}

}
