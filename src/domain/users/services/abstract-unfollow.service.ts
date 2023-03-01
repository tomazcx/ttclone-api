export abstract class AbstractUnfollow {
	abstract execute(userToFollowId: string, unfollowerId: string): Promise<void>
}
