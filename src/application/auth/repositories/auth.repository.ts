import {Inject, Injectable} from "@nestjs/common";
import {AuthCredentials} from "src/domain/auth/entities/AuthCredentials";
import {AbstractAuthRepository} from "src/domain/auth/repositories/abstract-auth.repository";
import {User} from "src/domain/users/entities/User";
import {PrismaService} from "src/external/services/prisma.service";

@Injectable()
export class AuthRepository implements AbstractAuthRepository {

	@Inject()
	private readonly prisma: PrismaService

	public async checkEmail(email: string): Promise<boolean> {
		const user = await this.prisma.user.findFirst({where: {email}})
		return !!user
	}

	public async checkId(id: string): Promise<User> {
		const user = await this.prisma.user.findFirst({where: {id}})
		return user
	}

	public async getAuthCredentials(email: string): Promise<AuthCredentials> {
		const user = await this.prisma.user.findFirst({where: {email}})

		return {
			id: user.id,
			email: user.email,
			password: user.password
		} as AuthCredentials
	}

}
