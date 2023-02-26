import {User} from "../entities/User";

export abstract class AbstractUpdateUserName {
	abstract execute(user: string, id: string): Promise<User>
}
