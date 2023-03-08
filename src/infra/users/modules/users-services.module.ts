import {Module} from "@nestjs/common";
import {UsersRepository} from "src/application/users/repositories/users.repository";
import {CheckUserNameService} from "src/application/users/services/CheckUserNameService";
import {CreateUserService} from "src/application/users/services/CreateUserService";
import {DeleteUserService} from "src/application/users/services/DeleteUserService";
import {FollowService} from "src/application/users/services/FollowService";
import {ShowFollowersService} from "src/application/users/services/ShowFollowersService";
import {ShowFollowingService} from "src/application/users/services/ShowFollowingService";
import {ShowUserByUserNameService} from "src/application/users/services/ShowUserByUserName";
import {ShowUsersByUserNameService} from "src/application/users/services/ShowUsersByUserNameService";
import {ShowUserService} from "src/application/users/services/ShowUserService";
import {UnfollowService} from "src/application/users/services/UnfollowService";
import {UpdateBannerService} from "src/application/users/services/UpdateBannerService";
import {UpdateImageService} from "src/application/users/services/UpdateImageService";
import {UpdatePasswordService} from "src/application/users/services/UpdatePasswordService";
import {UpdateProfileService} from "src/application/users/services/UpdateProfileService";
import {UpdateUserNameService} from "src/application/users/services/UpdateUserNameService";
import {AbstractUsersRepository} from "src/domain/users/repositories/abstract-users.repository";
import {AbstractCheckUserName} from "src/domain/users/services/abstract-check-user-name.service";
import {AbstractCreateUser} from "src/domain/users/services/abstract-create-user.service";
import {AbstractDeleteUser} from "src/domain/users/services/abstract-delete-user.service";
import {AbstractFollow} from "src/domain/users/services/abstract-follow.service";
import {AbstractShowFollowers} from "src/domain/users/services/abstract-show-followers.service";
import {AbstractShowFollowing} from "src/domain/users/services/abstract-show-following.service";
import {AbstractShowUserByUserName} from "src/domain/users/services/abstract-show-user-by-user-name.service";
import {AbstractShowUser} from "src/domain/users/services/abstract-show-user.service";
import {AbstractShowUsersByUserName} from "src/domain/users/services/abstract-show-users-by-user-name.service";
import {AbstractUnfollow} from "src/domain/users/services/abstract-unfollow.service";
import {AbstractUpdateBanner} from "src/domain/users/services/abstract-update-banner.service";
import {AbstractUpdateImage} from "src/domain/users/services/abstract-update-image.service";
import {AbstractUpdatePassword} from "src/domain/users/services/abstract-update-password.service";
import {AbstractUpdateProfile} from "src/domain/users/services/abstract-update-profile.service";
import {AbstractUpdateUserName} from "src/domain/users/services/abstract-update-user-name.service";
import {PrismaService} from "src/external/services/prisma.service";

@Module({
	providers: [
		{
			provide: AbstractShowUser,
			useClass: ShowUserService
		},
		{
			provide: AbstractCreateUser,
			useClass: CreateUserService
		},
		{
			provide: AbstractShowFollowers,
			useClass: ShowFollowersService
		},
		{
			provide: AbstractShowFollowing,
			useClass: ShowFollowingService
		},
		{
			provide: AbstractFollow,
			useClass: FollowService
		},
		{
			provide: AbstractUnfollow,
			useClass: UnfollowService
		},
		{
			provide: AbstractShowUsersByUserName,
			useClass: ShowUsersByUserNameService
		}
		,
		{
			provide: AbstractUpdateUserName,
			useClass: UpdateUserNameService
		},
		{
			provide: AbstractCheckUserName,
			useClass: CheckUserNameService
		},
		{
			provide: AbstractDeleteUser,
			useClass: DeleteUserService
		},
		{
			provide: AbstractUpdateProfile,
			useClass: UpdateProfileService
		},
		{
			provide: AbstractUpdatePassword,
			useClass: UpdatePasswordService
		},
		{
			provide: AbstractUpdateImage,
			useClass: UpdateImageService
		},
		{
			provide: AbstractUpdateBanner,
			useClass: UpdateBannerService
		},
		{
			provide: AbstractUsersRepository,
			useClass: UsersRepository
		},
		{
			provide: AbstractShowUserByUserName,
			useClass: ShowUserByUserNameService
		},
		PrismaService],
	exports: [
		{
			provide: AbstractShowUser,
			useClass: ShowUserService
		},
		{
			provide: AbstractCreateUser,
			useClass: CreateUserService
		},
		{
			provide: AbstractShowFollowers,
			useClass: ShowFollowersService
		},
		{
			provide: AbstractShowFollowing,
			useClass: ShowFollowingService
		},
		{
			provide: AbstractFollow,
			useClass: FollowService
		},
		{
			provide: AbstractUnfollow,
			useClass: UnfollowService
		},
		{
			provide: AbstractShowUsersByUserName,
			useClass: ShowUsersByUserNameService
		}
		,
		{
			provide: AbstractUpdateUserName,
			useClass: UpdateUserNameService
		},
		{
			provide: AbstractCheckUserName,
			useClass: CheckUserNameService
		},
		{
			provide: AbstractDeleteUser,
			useClass: DeleteUserService
		},
		{
			provide: AbstractUpdateProfile,
			useClass: UpdateProfileService
		},
		{
			provide: AbstractUpdatePassword,
			useClass: UpdatePasswordService
		},
		{
			provide: AbstractUpdateImage,
			useClass: UpdateImageService
		},
		{
			provide: AbstractUpdateBanner,
			useClass: UpdateBannerService
		},
		{
			provide: AbstractUsersRepository,
			useClass: UsersRepository
		},
		{
			provide: AbstractShowUserByUserName,
			useClass: ShowUserByUserNameService
		},
		PrismaService],
})
export class UserServicesModule {}
