export abstract class AbstractDeleteUser {
	abstract execute(id: string): Promise<void>
}
