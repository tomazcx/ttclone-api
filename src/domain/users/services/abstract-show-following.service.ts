import {User} from '../entities/User'

export abstract class AbstractShowFollowing {
	abstract execute(id: string): Promise<User[]>
}
