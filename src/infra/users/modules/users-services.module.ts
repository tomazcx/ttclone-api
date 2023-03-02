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
import {UpdateUserNameService} from "src/application/users/services/UpdateUserNameService";
import {PrismaService} from "src/external/services/prisma.service";

@Module({
	providers: [ShowUserService, CreateUserService, ShowFollowersService, ShowFollowingService, FollowService, UnfollowService, ShowUsersByUserNameService, UpdateUserNameService, CheckUserNameService, DeleteUserService, UsersRepository, PrismaService],
	exports: [ShowUserService, CreateUserService, ShowFollowersService, ShowFollowingService, FollowService, UnfollowService, ShowUsersByUserNameService, UpdateUserNameService, CheckUserNameService, DeleteUserService, UsersRepository, PrismaService]
})
export class UserServicesModule {}
