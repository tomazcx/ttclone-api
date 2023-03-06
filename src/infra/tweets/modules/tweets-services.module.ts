import {Module} from "@nestjs/common";
import {TweetsRepository} from "src/application/tweets/repositories/tweets.repository";
import {CreateTweetService} from "src/application/tweets/services/CreateTweetService";
import {DeleteTweetService} from "src/application/tweets/services/DeleteTweetService";
import {ShowLikedTweetsService} from "src/application/tweets/services/ShowLikedTweetsService";
import {ShowSavedTweetsService} from "src/application/tweets/services/ShowSavedTweetsService";
import {ShowTweetService} from "src/application/tweets/services/ShowTweetService";
import {ShowUserTweetsService} from "src/application/tweets/services/ShowUserTweetsService";
import {ShowWhoLikedService} from "src/application/tweets/services/ShowWhoLikedService";
import {ToggleLikeTweetService} from "src/application/tweets/services/ToggleLikeTweetService";
import {ToggleRetweetService} from "src/application/tweets/services/ToggleRetweetService";
import {ToggleSaveTweetService} from "src/application/tweets/services/ToggleSaveTweetService";
import {UsersRepository} from "src/application/users/repositories/users.repository";
import {PrismaService} from "src/external/services/prisma.service";
import {ShowWhoRetweetedService} from "src/application/tweets/services/ShowWhoRetweetedService";

@Module({
	providers: [
		CreateTweetService, PrismaService, TweetsRepository, UsersRepository, ShowUserTweetsService, ShowTweetService, DeleteTweetService, ToggleLikeTweetService, ShowWhoLikedService,
		ToggleSaveTweetService, ShowSavedTweetsService, ShowLikedTweetsService, ToggleRetweetService, ShowWhoRetweetedService
	],
	exports: [
		CreateTweetService, PrismaService, TweetsRepository, UsersRepository, ShowUserTweetsService, ShowTweetService, DeleteTweetService, ToggleLikeTweetService, ShowWhoLikedService,
		ToggleSaveTweetService, ShowSavedTweetsService, ShowLikedTweetsService, ToggleRetweetService, ShowWhoRetweetedService
	]
})
export class TweetsServicesModule {}
