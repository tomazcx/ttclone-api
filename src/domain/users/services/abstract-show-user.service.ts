import {UserTweets} from '../entities/UserTweets';

export abstract class AbstractShowUser {
	abstract execute(id: string): Promise<UserTweets>
}
