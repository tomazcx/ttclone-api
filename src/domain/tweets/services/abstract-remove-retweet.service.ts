export abstract class AbstractRemoveRetweet {
	abstract execute(tweetId: string, userId: string): Promise<void>
}
