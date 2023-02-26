import {Module} from '@nestjs/common';
import {CreateUserController} from '../controllers/CreateUserController';
import {ShowUserController} from '../controllers/ShowUserController';
import {UserServicesModule} from './users-services.module';

@Module({
	imports: [UserServicesModule],
	controllers: [ShowUserController, CreateUserController],

})
export class UsersModule {}
