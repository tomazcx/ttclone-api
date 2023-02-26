import {Module} from "@nestjs/common";
import {UsersRepository} from "src/application/users/repositories/users.repository";
import {CreateUserService} from "src/application/users/services/CreateUserService";
import {ShowUserService} from "src/application/users/services/ShowUserService";
import {PrismaService} from "src/external/services/prisma.service";

@Module({
	providers: [ShowUserService, CreateUserService, UsersRepository, PrismaService],
	exports: [ShowUserService, CreateUserService, UsersRepository, PrismaService]
})
export class UserServicesModule {}
