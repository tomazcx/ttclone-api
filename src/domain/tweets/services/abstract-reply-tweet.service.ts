import {Tweet} from "../entities/Tweet";
import {CreateTweetDto} from "src/application/tweets/dto/create-tweet.dto";

export abstract class AbstractReplyTweet {
	abstract execute(tweetId: string, authorId: string, createTweetDto: CreateTweetDto): Promise<Tweet>
}
