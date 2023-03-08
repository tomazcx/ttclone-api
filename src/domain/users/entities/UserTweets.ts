import {Tweet} from "src/domain/tweets/entities/Tweet"
import {TweetUserRelation} from "src/domain/tweets/entities/TweetUserRelation"

export class UserTweets {
	id: string
	name: string
	email: string
	user: string
	image?: string
	banner?: string
	localization?: string
	desc?: string
	url?: string

	tweets: Partial<Tweet>[]
	tweetsRetweeted: TweetUserRelation[]
	created_at: Date
}
