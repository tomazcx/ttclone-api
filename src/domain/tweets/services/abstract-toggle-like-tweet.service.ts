export abstract class AbstractToggleLikeTweet {
	abstract execute(tweetId: string, userWhoLikesId: string): Promise<void>
}
