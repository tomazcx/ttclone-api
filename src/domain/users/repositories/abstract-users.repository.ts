import {CreateUserDto} from 'src/application/users/dto/create-user.dto';
import {UpdateProfileDto} from 'src/application/users/dto/update-profile.dto';
import {User} from '../entities/User'
import {UserTweets} from '../entities/UserTweets';

export abstract class AbstractUsersRepository {

	abstract showUser(id: string): Promise<UserTweets>
	abstract showUserByUserName(user: string): Promise<UserTweets>
	abstract showUsersByUserName(user: string): Promise<User[]>
	abstract showFollowers(id: string): Promise<User[]>
	abstract showFollowing(id: string): Promise<User[]>
	abstract getPassword(id: string): Promise<string>
	abstract checkUserName(user: string): Promise<boolean>
	abstract checkId(id: string): Promise<boolean>
	abstract checkEmail(email: string): Promise<boolean>
	abstract createUser(createUserDto: CreateUserDto): Promise<User>
	abstract verifyUserFollowing(id: string, userThatIsFollowing: string): Promise<boolean>
	abstract follow(userId: string, followerId: string): Promise<void>
	abstract unfollow(userId: string, followerId: string): Promise<void>
	abstract updatePassword(password: string, id: string): Promise<User>
	abstract updateProfile(updateProfileDto: UpdateProfileDto, id: string): Promise<User>
	abstract updateUserName(user: string, id: string): Promise<User>
	abstract updateImage(image: string, id: string): Promise<User>
	abstract updateBanner(banner: string, id: string): Promise<User>
	abstract deleteUser(id: string): Promise<void>

}
