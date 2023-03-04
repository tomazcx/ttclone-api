import {Tweet} from "../entities/Tweet";

export abstract class AbstractShowReplies {
	abstract execute(tweetId: string): Promise<Tweet[]>
}
