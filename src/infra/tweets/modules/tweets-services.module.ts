import {Module} from "@nestjs/common";
import {TweetsRepository} from "src/application/tweets/repositories/tweets.repository";
import {CreateTweetService} from "src/application/tweets/services/CreateTweetService";
import {UsersRepository} from "src/application/users/repositories/users.repository";
import {PrismaService} from "src/external/services/prisma.service";

@Module({
	providers: [
		CreateTweetService, PrismaService, TweetsRepository, UsersRepository
	],
	exports: [
		CreateTweetService, PrismaService, TweetsRepository, UsersRepository
	]
})
export class TweetsServicesModule {}
