import {Tweet} from "../entities/Tweet";
import {CreateTweetDto} from "src/application/tweets/dto/create-tweet.dto";

export abstract class AbstractReplyTweet {
	abstract execute(createTweetDto: CreateTweetDto, tweetId: string, authorId: string): Promise<Tweet>
}
