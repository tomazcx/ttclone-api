import {User} from "src/domain/users/entities/User"

export class Tweet {
	id: string
	content: string
	authorId: string
	created_at: Date
	author: User

	replyId?: string
}
