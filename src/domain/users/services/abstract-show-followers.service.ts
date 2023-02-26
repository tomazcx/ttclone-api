import {User} from '../entities/User'

export abstract class AbstractShowFollowers {
	abstract execute(id: string): Promise<User[]>
}
