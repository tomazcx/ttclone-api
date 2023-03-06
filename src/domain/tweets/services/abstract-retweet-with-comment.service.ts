import {Tweet} from "../entities/Tweet";
import {CreateTweetDto} from "src/application/tweets/dto/create-tweet.dto";

export abstract class AbstractRetweetWithComment {
	abstract execute(createTweetDto: CreateTweetDto, tweetId: string, userWhoRetweetsId: string): Promise<Tweet>
}
