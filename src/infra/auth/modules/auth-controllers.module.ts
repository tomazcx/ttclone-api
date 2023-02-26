import {Module} from '@nestjs/common';
import {SignInController} from '../controllers/sign-in.controller';
import { AuthServicesModule } from './auth-services.module';

@Module({
	controllers: [SignInController],
	imports: [AuthServicesModule]
})
export class AuthControllersModule {}
