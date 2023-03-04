import {User} from "src/domain/users/entities/User";

export abstract class AbstractShowWhoRetweeted {
	abstract execute(tweetId: string): Promise<User[]>
}
