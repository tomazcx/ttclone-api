import {User} from '../entities/User'

export abstract class AbstractUpdateBanner {
	abstract execute(banner: string): Promise<User>
}
