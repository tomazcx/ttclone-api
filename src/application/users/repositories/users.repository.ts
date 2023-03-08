import {Injectable} from "@nestjs/common";
import {PreUser} from "src/domain/users/entities/PreUser";
import {User} from "src/domain/users/entities/User";
import {UserTweets} from "src/domain/users/entities/UserTweets";
import {AbstractUsersRepository} from "src/domain/users/repositories/abstract-users.repository";
import {PrismaService} from "src/external/services/prisma.service";
import {CreateUserDto} from "../dto/create-user.dto";
import {UpdateProfileDto} from "../dto/update-profile.dto";
import {excludeField} from "../utils/exclude-field.util";


@Injectable()
export class UsersRepository implements AbstractUsersRepository {

	constructor(private readonly prisma: PrismaService) {}

	public async checkId(id: string): Promise<boolean> {
		const user = await this.prisma.user.findFirst({where: {id}})
		return !!user
	}

	public async showUser(id: string): Promise<UserTweets> {
		const user = await this.prisma.user.findFirst({
			where: {id},
			include: {
				tweets: {
					include: {
						retweetingWithCommentTo: {
							include: {
								author: true
							}
						}
					}
				},
				tweetsRetweeted: {
					include: {
						tweet: {
							include: {
								author: true
							}
						}
					}
				}
			}
		}) as any
		const formatedUser = excludeField(user, ['password'])
		return formatedUser as UserTweets
	}

	public async showUserByUserName(user: string): Promise<UserTweets> {
		const userData = await this.prisma.user.findFirst({
			where: {user},
			include: {
				tweets: {
					include: {
						retweetingWithCommentTo: {
							include: {
								author: true
							}
						}
					}
				},
				tweetsRetweeted: {
					include: {
						tweet: {
							include: {
								author: true
							}
						}
					}
				}
			}
		}) as any
		const formatedUser = excludeField(userData, ['password'])
		return formatedUser as UserTweets
	}

	public async showUsersByUserName(user: string): Promise<User[]> {
		const users = await this.prisma.user.findMany({
			where: {
				user: {
					contains: user
				}
			}
		}) as PreUser[]

		const formatedUsers = users.map(user => excludeField(user, ['password']))
		return formatedUsers
	}

	public async showFollowers(id: string): Promise<User[]> {
		const followers = await this.prisma.$queryRaw`
			SELECT users.* FROM users JOIN user_followers ON users.id = user_followers.followerId WHERE user_followers.userId = ${id}
		` as PreUser[]
		const formatedFollowers = followers.map(follower => excludeField(follower, ['password']))

		return formatedFollowers as User[]
	}

	public async showFollowing(id: string): Promise<User[]> {
		const following = await this.prisma.$queryRaw`
			SELECT users.* FROM users JOIN user_followers ON users.id = user_followers.userId WHERE user_followers.followerId = ${id}
		` as PreUser[]

		const formatedFOllowing = following.map(follower => excludeField(follower, ['password']))

		return formatedFOllowing as User[]

	}

	public async getPassword(id: string): Promise<string> {
		const user = await this.prisma.user.findFirst({where: {id}})
		return user.password
	}

	public async checkUserName(user: string): Promise<boolean> {
		const userEntity = await this.prisma.user.findFirst({where: {user}})
		return !!userEntity
	}

	public async checkEmail(email: string): Promise<boolean> {
		const user = await this.prisma.user.findFirst({where: {email}})
		return !!user
	}

	public async createUser({name, user, email, password}: CreateUserDto): Promise<User> {
		const userEntity = await this.prisma.user.create({
			data: {
				name,
				user,
				email,
				password,
				created_at: new Date()
			}
		}) as PreUser
		const userWithoutPassword = excludeField(userEntity, ['password'])
		return userWithoutPassword
	}

	public async verifyUserFollowing(id: string, userThatIsFollowing: string): Promise<boolean> {

		const user = await this.prisma.$queryRaw`
			SELECT users.* FROM users JOIN user_followers ON users.id = user_followers.userId WHERE user_followers.followerId = ${id} AND users.id = ${userThatIsFollowing}
		` as []


		return user.length > 0 ? true : false

	}


	public async follow(id: string, followerId: string): Promise<void> {
		await this.prisma.userFollowers.create({
			data: {
				user: {
					connect: {id}
				},
				follower: {
					connect: {id: followerId}
				},
				created_at: new Date()
			},
		})
	}

	public async unfollow(userToUnfollowId: string, unfollowerId: string): Promise<void> {
		await this.prisma.user.update({
			where: {id: unfollowerId},
			data: {
				following: {
					deleteMany: {userId: userToUnfollowId}
				}
			}
		})
	}

	public async updatePassword(password: string, id: string): Promise<User> {
		const user = await this.prisma.user.update({
			where: {id},
			data: {password}
		})

		const userWithoutPassword = excludeField(user, ['password'])
		return userWithoutPassword
	}

	public async updateProfile(updateProfileDto: UpdateProfileDto, id: string): Promise<User> {
		const user = await this.prisma.user.update({
			where: {id},
			data: updateProfileDto
		})
		const userWithoutPassword = excludeField(user, ['password'])
		return userWithoutPassword
	}


	public async updateUserName(user: string, id: string): Promise<User> {
		const userEntity = await this.prisma.user.update({
			where: {id},
			data: {
				user
			}
		})

		const userWithoutPassword = excludeField(userEntity, ['password'])
		return userWithoutPassword
	}


	public async updateImage(image: string, id: string): Promise<User> {
		const user = await this.prisma.user.update({
			where: {id},
			data: {image}
		})

		const userWithoutPassword = excludeField(user, ['password'])
		return userWithoutPassword
	}

	public async updateBanner(banner: string, id: string): Promise<User> {
		const user = await this.prisma.user.update({
			where: {id},
			data: {banner}
		})

		const userWithoutPassword = excludeField(user, ['password'])
		return userWithoutPassword
	}

	public async deleteUser(id: string): Promise<void> {
		await this.prisma.user.update({
			where: {id},
			data: {
				followedBy: {
					deleteMany: {}
				},
				following: {
					deleteMany: {}
				}
			}
		})
		await this.prisma.user.delete({where: {id}})
	}
}
