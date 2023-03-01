import {Module} from '@nestjs/common';
import {UsersModule} from './infra/users/modules/users.module';

@Module({
	imports: [UsersModule]
})
export class AppModule {}
