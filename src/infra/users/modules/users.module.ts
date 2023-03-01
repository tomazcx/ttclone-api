import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AuthControllersModule} from 'src/infra/auth/modules/auth-controllers.module';
import {ValidateIdMiddleware} from 'src/infra/common/middlewares/validate-id.middleware';
import {CreateUserController} from '../controllers/CreateUserController';
import {FollowController} from '../controllers/FollowController';
import {ShowFollowersController} from '../controllers/ShowFollowersController';
import {ShowUserController} from '../controllers/ShowUserController';
import {UserServicesModule} from './users-services.module';

@Module({
	imports: [UserServicesModule, AuthControllersModule],
	controllers: [ShowUserController, CreateUserController, FollowController, ShowFollowersController],

})
export class UsersModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(ValidateIdMiddleware)
			.forRoutes(ShowUserController)
	}
}
