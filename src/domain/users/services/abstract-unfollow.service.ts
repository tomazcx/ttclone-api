export abstract class AbstractUnfollow {
	abstract execute(id: string, unfollowId: string): Promise<void>
}
