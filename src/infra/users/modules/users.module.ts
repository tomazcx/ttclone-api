import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AuthControllersModule} from 'src/infra/auth/modules/auth-controllers.module';
import {ValidateIdMiddleware} from 'src/infra/common/middlewares/validate-id.middleware';
import {CheckUserNameController} from '../controllers/CheckUserNameController';
import {CreateUserController} from '../controllers/CreateUserController';
import {DeleteUserController} from '../controllers/DeleteUserController';
import {FollowController} from '../controllers/FollowController';
import {ShowFollowersController} from '../controllers/ShowFollowersController';
import {ShowFollowingController} from '../controllers/ShowFollowingController';
import {ShowUsersByUserNameController} from '../controllers/ShowUserByUserNameController';
import {ShowUserController} from '../controllers/ShowUserController';
import {UnfollowController} from '../controllers/UnfollowController';
import {UpdateBannerController} from '../controllers/UpdateBannerController';
import {UpdateImageController} from '../controllers/UpdateImageController';
import {UpdatePasswordController} from '../controllers/UpdatePasswordController';
import {UpdateProfileController} from '../controllers/UpdateProfileController';
import {UpdateUserNameController} from '../controllers/UpdateUserNameController';
import {UserServicesModule} from './users-services.module';

@Module({
	imports: [UserServicesModule, AuthControllersModule],
	controllers: [ShowUserController, CreateUserController, FollowController, ShowFollowersController, ShowFollowingController, ShowUsersByUserNameController, UnfollowController, UpdateUserNameController, CheckUserNameController, DeleteUserController, UpdateProfileController, UpdatePasswordController, UpdateImageController, UpdateBannerController],

})
export class UsersModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(ValidateIdMiddleware)
			.forRoutes(ShowUserController, ShowFollowersController, ShowFollowingController, FollowController, UnfollowController)
	}
}
