import {UpdateProfileDto} from 'src/application/users/dto/update-profile.dto';
import {User} from '../entities/User'

export abstract class AbstractUpdateProfile {
	abstract execute(updateProfileDto: UpdateProfileDto, id: string): Promise<User>
}
