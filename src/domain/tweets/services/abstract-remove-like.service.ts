export abstract class AbstractRemoveLike {
	abstract execute(tweetId: string, userWhoUnlikesId: string): Promise<void>
}
