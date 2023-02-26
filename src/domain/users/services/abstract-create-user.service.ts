import {CreateUserDto} from 'src/application/users/dto/create-user.dto';
import {User} from '../entities/User'

export abstract class AbstractCreateUser {
	abstract execute(createUserDto: CreateUserDto): Promise<User>
}
