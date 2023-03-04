import {Tweet} from "../entities/Tweet";

export abstract class AbstractShowTweet {
	abstract execute(id: string): Promise<Tweet>
}
