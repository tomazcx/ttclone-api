import {UserTweets} from "../entities/UserTweets";

export abstract class AbstractShowUserByUserName {
	abstract execute(user: string): Promise<UserTweets>
}
