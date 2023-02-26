import {User} from "../../users/entities/User";

export abstract class AbstractValidateUser {
	abstract execute(id: string): Promise<User>
}
