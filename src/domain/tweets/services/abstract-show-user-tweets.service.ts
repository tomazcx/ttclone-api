import {Tweet} from "../entities/Tweet";

export abstract class ShowUserTweets {
	abstract execute(userId: string): Promise<Tweet[]>
}
