import {Module} from "@nestjs/common";
import {UsersRepository} from "src/application/users/repositories/users.repository";
import {CreateUserService} from "src/application/users/services/CreateUserService";
import {FollowService} from "src/application/users/services/FollowService";
import {ShowFollowersService} from "src/application/users/services/ShowFollowersService";
import {ShowFollowingService} from "src/application/users/services/ShowFollowingService";
import {ShowUsersByUserNameService} from "src/application/users/services/ShowUsersByUserNameService";
import {ShowUserService} from "src/application/users/services/ShowUserService";
import {PrismaService} from "src/external/services/prisma.service";

@Module({
	providers: [ShowUserService, CreateUserService, ShowFollowersService, ShowFollowingService, FollowService, ShowUsersByUserNameService, UsersRepository, PrismaService],
	exports: [ShowUserService, CreateUserService, ShowFollowersService, ShowFollowingService, FollowService, ShowUsersByUserNameService, UsersRepository, PrismaService]
})
export class UserServicesModule {}
