export abstract class AbstractFollow {
	abstract execute(userToFollowId: string, followerId: string): Promise<void>
}
