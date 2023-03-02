import {UserName} from "../entities/UserName";

export abstract class AbstractCheckUserName {
	abstract execute(user: string): Promise<UserName>
}
