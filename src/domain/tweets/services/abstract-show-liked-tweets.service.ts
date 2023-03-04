import {Tweet} from "../entities/Tweet";

export abstract class AbstractShowLikedTweets {
	abstract execute(userId: string): Promise<Tweet[]>
}
