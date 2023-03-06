import {Tweet} from "../entities/Tweet";

export abstract class AbstractShowSavedTweets {

	abstract execute(userId: string): Promise<Tweet[]>

}
