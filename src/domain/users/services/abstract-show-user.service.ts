import {User} from '../entities/User'

export abstract class AbstractShowUser {
	abstract execute(id: string): Promise<User>
}
