import {Module} from '@nestjs/common';
import {AuthControllersModule} from './infra/auth/modules/auth-controllers.module';
import {UsersModule} from './infra/users/modules/users.module';

@Module({
	imports: [AuthControllersModule, UsersModule]
})
export class AppModule {}
