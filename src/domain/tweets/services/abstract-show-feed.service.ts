import {Tweet} from "../entities/Tweet";

export abstract class AbstractShowFeed {
	abstract execute(id: string): Promise<Tweet[]>
}
