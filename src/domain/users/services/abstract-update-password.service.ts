import {UpdatePasswordDto} from 'src/application/users/dto/update-password.dto';
import {User} from '../entities/User'

export abstract class AbstractUpdatePassword {
	abstract execute(updatePasswordDto: UpdatePasswordDto, id: string): Promise<User>
}
