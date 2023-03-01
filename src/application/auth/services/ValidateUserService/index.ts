import {Inject, Injectable, NotFoundException} from "@nestjs/common";
import {AbstractValidateUser} from "src/domain/auth/services/abstract-validate-user.service";
import {User} from "src/domain/users/entities/User";
import {AuthRepository} from "../../repositories/auth.repository";

@Injectable()
export class ValidateUserService implements AbstractValidateUser {

	@Inject()
	private authRepository: AuthRepository

	public async execute(id: string): Promise<User> {
		const user = await this.authRepository.checkId(id)

		if (!user) {
			throw new NotFoundException('User with the authenticated jwt was not found')
		}

		return user
	}

}
