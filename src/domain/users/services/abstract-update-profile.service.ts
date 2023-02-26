import {UpdateProfileDto} from 'src/application/users/dto/update-profile.dto';
import {User} from '../entities/User'

export abstract class AbstractUpdateProfileService {
	abstract export(updateProfileDto: UpdateProfileDto, id: string): Promise<User>
}
