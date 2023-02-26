import {Injectable} from "@nestjs/common";
import {User} from "src/domain/users/entities/User";
import {AbstractUsersRepository} from "src/domain/users/repositories/abstract-users.repository";
import {PrismaService} from "src/external/services/prisma.service";
import {CreateUserDto} from "../dto/create-user.dto";
import {UpdateProfileDto} from "../dto/update-profile.dto";


@Injectable()
export class UsersRepository implements AbstractUsersRepository {

	constructor(private readonly prisma: PrismaService) {}

	public async showUser(id: string): Promise<User> {
		const user = await this.prisma.user.findFirst({where: {id}})
		return user
	}

	public async showUsersByUserName(user: string): Promise<User[]> {
		const users = await this.prisma.user.findMany({
			where: {
				user: {
					contains: user
				}
			}
		})

		return users
	}

	public async showFollowers(id: string): Promise<User[]> {
		const followers = await this.prisma.user.findMany({
			where: {
				followedBy: {
					every: {
						userId: id
					}
				}
			}
		})
		return followers
	}

	public async showFollowing(id: string): Promise<User[]> {
		const following = await this.prisma.user.findMany({
			where: {
				following: {
					every: {
						followerId: id
					}
				}
			}
		})

		return following

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
		})
		return userEntity
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

	public async unfollow(userId: string, followerId: string): Promise<void> {
		await this.prisma.user.update({
			where: {id: followerId},
			data: {
				following: {
					disconnect: {id: userId}
				}
			}
		})
	}

	public async updatePassword(password: string, id: string): Promise<User> {
		const user = await this.prisma.user.update({
			where: {id},
			data: {password}
		})

		return user
	}

	public async updateProfile(updateProfileDto: UpdateProfileDto, id: string): Promise<User> {
		const user = await this.prisma.user.update({
			where: {id},
			data: updateProfileDto
		})
		return user
	}


	public async updateUserName(user: string, id: string): Promise<User> {
		const userEntity = await this.prisma.user.update({
			where: {id},
			data: user
		})

		return userEntity
	}


	public async updateImage(image: string, id: string): Promise<User> {
		const user = await this.prisma.user.update({
			where: {id},
			data: {image}
		})

		return user
	}

	public async updateBanner(banner: string, id: string): Promise<User> {
		const user = await this.prisma.user.update({
			where: {id},
			data: {banner}
		})

		return user
	}

	public async deleteUser(id: string): Promise<void> {
		await this.prisma.user.delete({where: {id}})
	}
}
