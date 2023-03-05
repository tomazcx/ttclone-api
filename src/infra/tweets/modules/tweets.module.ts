import {Module} from "@nestjs/common";
import {AuthControllersModule} from "src/infra/auth/modules/auth-controllers.module";
import {CreateTweetController} from "../controllers/CreateTweetController";
import {TweetsServicesModule} from "./tweets-services.module";

@Module({
	imports: [AuthControllersModule, TweetsServicesModule],
	controllers: [CreateTweetController]
})
export class TweetsModule {}
