import {User} from "src/domain/users/entities/User";

export abstract class AbstractShowWhoLiked {
	abstract execute(tweetId: string): Promise<User>
}
