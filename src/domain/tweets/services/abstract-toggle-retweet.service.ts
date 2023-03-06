export abstract class AbstractToggleRetweet {
	abstract execute(tweetId: string, userWhoRetweetsId: string): Promise<void>
}
