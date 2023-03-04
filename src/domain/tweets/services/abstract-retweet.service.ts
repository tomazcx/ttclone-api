import {RetweetDto} from "src/application/tweets/dto/retweet.dto";

export abstract class AbstractRetweet {
	abstract execute(tweetId: string, userWhoRetweetsId: string, retweetDto: RetweetDto): Promise<void>
}
