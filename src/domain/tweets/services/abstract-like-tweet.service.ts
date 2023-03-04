export abstract class AbstractLikeTweet {
	abstract execute(tweetId: string, userWhoLikesId: string): Promise<void>
}
