export abstract class AbstractDeleteTweet {
	abstract execute(id: string, authorId: string): Promise<void>
}
