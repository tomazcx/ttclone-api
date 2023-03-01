import {Module} from "@nestjs/common";
import {UsersRepository} from "src/application/users/repositories/users.repository";
import {CreateUserService} from "src/application/users/services/CreateUserService";
import {FollowService} from "src/application/users/services/FollowService";
import {ShowFollowersService} from "src/application/users/services/ShowFollowersService";
import {ShowUserService} from "src/application/users/services/ShowUserService";
import {PrismaService} from "src/external/services/prisma.service";

@Module({
	providers: [ShowUserService, CreateUserService, ShowFollowersService, FollowService, UsersRepository, PrismaService],
	exports: [ShowUserService, CreateUserService, ShowFollowersService, FollowService, UsersRepository, PrismaService]
})
export class UserServicesModule {}
