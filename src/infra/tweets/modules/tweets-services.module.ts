import {Module} from "@nestjs/common";
import {TweetsRepository} from "src/application/tweets/repositories/tweets.repository";
import {CreateTweetService} from "src/application/tweets/services/CreateTweetService";
import {DeleteTweetService} from "src/application/tweets/services/DeleteTweetService";
import {ShowTweetService} from "src/application/tweets/services/ShowTweetService";
import {ShowUserTweetsService} from "src/application/tweets/services/ShowUserTweetsService";
import {UsersRepository} from "src/application/users/repositories/users.repository";
import {PrismaService} from "src/external/services/prisma.service";

@Module({
	providers: [
		CreateTweetService, PrismaService, TweetsRepository, UsersRepository, ShowUserTweetsService, ShowTweetService, DeleteTweetService
	],
	exports: [
		CreateTweetService, PrismaService, TweetsRepository, UsersRepository, ShowUserTweetsService, ShowTweetService, DeleteTweetService
	]
})
export class TweetsServicesModule {}
