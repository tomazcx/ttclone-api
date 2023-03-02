import {AuthCredentials} from "../entities/AuthCredentials";
import {User} from "../../users/entities/User";

export abstract class AbstractAuthRepository {

	abstract checkEmail(email: string): Promise<boolean>
	abstract showUser(id: string): Promise<User>
	abstract checkId(id: string): Promise<boolean>
	abstract getAuthCredentials(email: string): Promise<AuthCredentials>

}
