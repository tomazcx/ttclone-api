export abstract class AbstracrCheckUserName {
	abstract execute(user: string): Promise<boolean>
}
