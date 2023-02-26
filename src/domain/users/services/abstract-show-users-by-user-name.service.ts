import {User} from '../entities/User'

export abstract class AbstractShowUsersByUserName {
	abstract execute(user: string): Promise<User[]>
}
