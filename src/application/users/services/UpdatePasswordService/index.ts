import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from 'src/infra/common/errors/types/NotFoundError'
import {User} from "src/domain/users/entities/User";
import {AbstractUpdatePassword} from "src/domain/users/services/abstract-update-password.service";
import {UnprocessableEntityError} from "src/infra/common/errors/types/UnprocessableEntityError";
import {UpdatePasswordDto} from "../../dto/update-password.dto";
import {UsersRepository} from "../../repositories/users.repository";
import * as bcrypt from 'bcrypt'
import {BadRequestError} from "src/infra/common/errors/types/BadRequestError";

@Injectable()
export class UpdatePasswordService implements AbstractUpdatePassword {

	@Inject()
	private usersRepository: UsersRepository

	public async execute({oldPassword, password, confirmPassword}: UpdatePasswordDto, id: string): Promise<User> {

		if (password !== confirmPassword) {
			throw new UnprocessableEntityError('Password and confirmPassword are not te same')
		}

		const userExists = await this.usersRepository.checkId(id)

		if (!userExists) {
			throw new NotFoundError('User not found')
		}

		const currentPassword = await this.usersRepository.getPassword(id)

		//validate old password
		const isOldPasswordValid = await bcrypt.compare(oldPassword, currentPassword)

		if (!isOldPasswordValid) {
			throw new BadRequestError('Wrong password.')
		}

		//verify if the new password and the currentPassword are the same
		const passwordsAreTheSame = await bcrypt.compare(password, currentPassword)

		if (passwordsAreTheSame) {
			throw new UnprocessableEntityError('Your new password can not be the same as the old one')
		}

		const hashdPassword = await bcrypt.hash(password, 12)

		const user = await this.usersRepository.updatePassword(hashdPassword, id)

		return user

	}

}
