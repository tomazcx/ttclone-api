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
import {AbstractCreateTweet} from "src/domain/tweets/services/abstract-create-tweet.service";
import {AbstractTweetsRepository} from "src/domain/tweets/repositories/abstract-tweets.repository";
import {AbstractUsersRepository} from "src/domain/users/repositories/abstract-users.repository";
import {AbstractShowUserTweets} from "src/domain/tweets/services/abstract-show-user-tweets.service";
import {AbstractShowTweet} from "src/domain/tweets/services/abstract-show-tweet.service";
import {AbstractDeleteTweet} from "src/domain/tweets/services/abstract-delete-tweet.service";
import {AbstractToggleLikeTweet} from "src/domain/tweets/services/abstract-toggle-like-tweet.service";
import {AbstractShowWhoLiked} from "src/domain/tweets/services/abstract-show-who-liked.service";
import {AbstractToggleSaveTweet} from "src/domain/tweets/services/abstract-toggle-save-tweet.service";
import {AbstractShowSavedTweets} from "src/domain/tweets/services/abstract-show-saved-tweets.service";
import {AbstractShowLikedTweets} from "src/domain/tweets/services/abstract-show-liked-tweets.service";
import {AbstractToggleRetweet} from "src/domain/tweets/services/abstract-toggle-retweet.service";
import {AbstractShowWhoRetweeted} from "src/domain/tweets/services/abstract-show-who-retweeted.service";

@Module({
	providers: [
		{
			provide: AbstractCreateTweet,
			useClass: CreateTweetService
		},
		{
			provide: AbstractTweetsRepository,
			useClass: TweetsRepository
		},
		{
			provide: AbstractUsersRepository,
			useClass: UsersRepository
		},
		{
			provide: AbstractShowUserTweets,
			useClass: ShowUserTweetsService
		},
		{
			provide: AbstractShowTweet,
			useClass: ShowTweetService
		},
		{
			provide: AbstractDeleteTweet,
			useClass: DeleteTweetService
		},
		{
			provide: AbstractToggleLikeTweet,
			useClass: ToggleLikeTweetService
		},
		{
			provide: AbstractShowWhoLiked,
			useClass: ShowWhoLikedService
		},
		{
			provide: AbstractToggleSaveTweet,
			useClass: ToggleSaveTweetService
		},
		{
			provide: AbstractShowSavedTweets,
			useClass: ShowSavedTweetsService
		},
		{
			provide: AbstractShowLikedTweets,
			useClass: ShowLikedTweetsService
		},
		{
			provide: AbstractToggleRetweet,
			useClass: ToggleRetweetService
		},
		{
			provide: AbstractShowWhoRetweeted,
			useClass: ShowWhoRetweetedService
		}, PrismaService
	],
	exports: [
		{
			provide: AbstractCreateTweet,
			useClass: CreateTweetService
		},
		{
			provide: AbstractTweetsRepository,
			useClass: TweetsRepository
		},
		{
			provide: AbstractUsersRepository,
			useClass: UsersRepository
		},
		{
			provide: AbstractShowUserTweets,
			useClass: ShowUserTweetsService
		},
		{
			provide: AbstractShowTweet,
			useClass: ShowTweetService
		},
		{
			provide: AbstractDeleteTweet,
			useClass: DeleteTweetService
		},
		{
			provide: AbstractToggleLikeTweet,
			useClass: ToggleLikeTweetService
		},
		{
			provide: AbstractShowWhoLiked,
			useClass: ShowWhoLikedService
		},
		{
			provide: AbstractToggleSaveTweet,
			useClass: ToggleSaveTweetService
		},
		{
			provide: AbstractShowSavedTweets,
			useClass: ShowSavedTweetsService
		},
		{
			provide: AbstractShowLikedTweets,
			useClass: ShowLikedTweetsService
		},
		{
			provide: AbstractToggleRetweet,
			useClass: ToggleRetweetService
		},
		{
			provide: AbstractShowWhoRetweeted,
			useClass: ShowWhoRetweetedService
		}, PrismaService
	]
})
export class TweetsServicesModule {}
