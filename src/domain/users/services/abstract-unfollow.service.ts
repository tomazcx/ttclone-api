export abstract class AbstractUnfollow {
	abstract execute(id: string): Promise<void>
}
