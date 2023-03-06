import {PreUser} from "src/domain/users/entities/PreUser"

export class TweetUserRelation {
	id: string
	userId: string
	tweetId: string
	created_at: Date
	user: PreUser
}
