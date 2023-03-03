import {Module} from '@nestjs/common';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';
import {UsersModule} from './infra/users/modules/users.module';

@Module({
	imports: [
		UsersModule,
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'temp/', 'uploads/')
		})
	]
})
export class AppModule {}
