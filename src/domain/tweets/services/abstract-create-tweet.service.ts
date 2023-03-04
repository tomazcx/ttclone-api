import {Tweet} from "../entities/Tweet";
import {CreateTweetDto} from "src/application/tweets/dto/create-tweet.dto";

export abstract class AbstractCreateTweet {
	abstract execute(createTweetDto: CreateTweetDto, authorId: string): Promise<Tweet>
}
