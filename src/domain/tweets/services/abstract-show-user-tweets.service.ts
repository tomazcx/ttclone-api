import {Tweet} from "../entities/Tweet";

export abstract class AbstractShowUserTweets {
	abstract execute(userId: string): Promise<Tweet[]>
}
