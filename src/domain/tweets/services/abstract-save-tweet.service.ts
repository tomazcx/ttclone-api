export abstract class AbstractSaveTweet {
	abstract execute(tweetId: string, userWhoSaveId: string): Promise<void>
}
