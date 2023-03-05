export abstract class AbstractRemoveSavedTweet {
	abstract execute(tweetId: string, userWhoSavedId: string): Promise<void>
}
