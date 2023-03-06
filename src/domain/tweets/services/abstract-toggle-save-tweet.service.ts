export abstract class AbstractToggleSaveTweet {
	abstract execute(tweetId: string, userWhoSaveId: string): Promise<void>
}
