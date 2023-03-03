import {User} from '../entities/User'

export abstract class AbstractUpdateImage {
	abstract execute(image: string, id: string): Promise<User>
}
