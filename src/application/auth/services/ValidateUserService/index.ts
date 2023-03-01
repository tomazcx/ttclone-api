import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from "src/infra/common/errors/types/NotFoundError";
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
			throw new NotFoundError('User not found')
		}

		return user
	}

}
