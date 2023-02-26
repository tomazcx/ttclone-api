import {UpdatePasswordDto} from 'src/application/users/dto/update-password.dto';
import {User} from '../entities/User'

export abstract class UpdatePasswordService {
	abstract execute(updatePasswordDto: UpdatePasswordDto, id: string): Promise<User>
}
