import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {AuthControllersModule} from "src/infra/auth/modules/auth-controllers.module";
import {ValidateIdMiddleware} from "src/infra/common/middlewares/validate-id.middleware";
import {CreateTweetController} from "../controllers/CreateTweetController";
import {DeleteTweetController} from "../controllers/DeleteTweetController";
import {ShowTweetController} from "../controllers/ShowTweetController";
import {ShowUserTweetsController} from "../controllers/ShowUserTweetsController";
import {TweetsServicesModule} from "./tweets-services.module";

@Module({
	imports: [AuthControllersModule, TweetsServicesModule],
	controllers: [CreateTweetController, ShowUserTweetsController, ShowTweetController, DeleteTweetController]
})
export class TweetsModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(ValidateIdMiddleware)
			.forRoutes(ShowUserTweetsController, ShowTweetController)
	}
}
