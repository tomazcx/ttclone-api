import {AuthCredentials} from "../entities/AuthCredentials";
import {User} from "../../users/entities/User";

export abstract class AbstractAuthRepository {

	abstract checkEmail(email: string): Promise<boolean>
	abstract checkId(id: string): Promise<User>
	abstract getAuthCredentials(email: string): Promise<AuthCredentials>

}
