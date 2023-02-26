export abstract class AbstractFollow {
	abstract execute(id: string): Promise<void>
}
