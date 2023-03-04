export class Tweet {
	id: string
	content: string
	authorId: string
	created_at: Date

	replyId?: string
}
