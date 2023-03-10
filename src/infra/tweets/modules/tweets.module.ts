import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {AuthControllersModule} from "src/infra/auth/modules/auth-controllers.module";
import {ValidateIdMiddleware} from "src/infra/common/middlewares/validate-id.middleware";
import {CreateTweetController} from "../controllers/CreateTweetController";
import {DeleteTweetController} from "../controllers/DeleteTweetController";
import {RetweetWithCommentController} from "../controllers/RetweetWithCommentController";
import {ShowLikedTweetsController} from "../controllers/ShowLikedTweetsController";
import {ShowSavedTweetsController} from "../controllers/ShowSavedTweetsController";
import {ShowTweetController} from "../controllers/ShowTweetController";
import {ShowWhoLikedController} from "../controllers/ShowWhoLikedController";
import {ShowWhoRetweetedController} from "../controllers/ShowWhoRetweetedController";
import {ToggleLikeTweetController} from "../controllers/ToggleLikeTweetController";
import {ToggleRetweetController} from "../controllers/ToggleRetweetController";
import {ToggleSaveTweetController} from "../controllers/ToggleSaveTweet";
import {TweetsServicesModule} from "./tweets-services.module";

@Module({
	imports: [AuthControllersModule, TweetsServicesModule],
	controllers: [CreateTweetController, ShowTweetController, DeleteTweetController, ToggleLikeTweetController, ShowWhoLikedController, ToggleSaveTweetController, ShowSavedTweetsController, ShowLikedTweetsController, ToggleRetweetController, ShowWhoRetweetedController, RetweetWithCommentController]
})
export class TweetsModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(ValidateIdMiddleware)
			.forRoutes(ShowTweetController, ToggleLikeTweetController, DeleteTweetController, ToggleSaveTweetController, ShowLikedTweetsController, ToggleRetweetController, ShowWhoRetweetedController, RetweetWithCommentController)

	}
}
