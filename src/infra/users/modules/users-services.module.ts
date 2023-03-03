import {Module} from "@nestjs/common";
import {UsersRepository} from "src/application/users/repositories/users.repository";
import {CheckUserNameService} from "src/application/users/services/CheckUserNameService";
import {CreateUserService} from "src/application/users/services/CreateUserService";
import {DeleteUserService} from "src/application/users/services/DeleteUserService";
import {FollowService} from "src/application/users/services/FollowService";
import {ShowFollowersService} from "src/application/users/services/ShowFollowersService";
import {ShowFollowingService} from "src/application/users/services/ShowFollowingService";
import {ShowUsersByUserNameService} from "src/application/users/services/ShowUsersByUserNameService";
import {ShowUserService} from "src/application/users/services/ShowUserService";
import {UnfollowService} from "src/application/users/services/UnfollowService";
import {UpdateBannerService} from "src/application/users/services/UpdateBannerService";
import {UpdateImageService} from "src/application/users/services/UpdateImageService";
import {UpdatePasswordService} from "src/application/users/services/UpdatePasswordService";
import {UpdateProfileService} from "src/application/users/services/UpdateProfileService";
import {UpdateUserNameService} from "src/application/users/services/UpdateUserNameService";
import {PrismaService} from "src/external/services/prisma.service";

@Module({
	providers: [ShowUserService, CreateUserService, ShowFollowersService, ShowFollowingService, FollowService, UnfollowService, ShowUsersByUserNameService, UpdateUserNameService, CheckUserNameService, DeleteUserService, UpdateProfileService, UpdatePasswordService, UpdateImageService, UpdateBannerService, UsersRepository, PrismaService],
	exports: [ShowUserService, CreateUserService, ShowFollowersService, ShowFollowingService, FollowService, UnfollowService, ShowUsersByUserNameService, UpdateUserNameService, CheckUserNameService, DeleteUserService, UpdateProfileService, UpdatePasswordService, UpdateImageService, UpdateBannerService, UsersRepository, PrismaService]
})
export class UserServicesModule {}
