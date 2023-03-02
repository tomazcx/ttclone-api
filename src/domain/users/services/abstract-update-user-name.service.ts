import {UpdateUserNameDto} from "src/application/users/dto/update-user-name.dto";
import {User} from "../entities/User";

export abstract class AbstractUpdateUserName {
	abstract execute(updateUserNameDto: UpdateUserNameDto, id: string): Promise<User>
}
