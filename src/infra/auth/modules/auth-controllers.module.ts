import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {SignInController} from '../controllers/sign-in.controller';
import {AuthServicesModule} from './auth-services.module';
import {JwtModule} from '@nestjs/jwt'
import {JwtStrategy} from '../strategies/jwt.strategy';

@Module({
	controllers: [SignInController],
	imports: [AuthServicesModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: {
				expiresIn: process.env.JWT_EXPIRES_IN
			}
		})
	],
	providers: [JwtStrategy]
})
export class AuthControllersModule {}
