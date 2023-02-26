import {Inject, Injectable} from "@nestjs/common"; import {User} from
	"src/domain/users/entities/User";
import {AbstractCreateUser} from "src/domain/users/services/abstract-create-user.service";
import {BadRequestError} from "src/infra/common/errors/types/BadRequestError";
import {CreateUserDto} from "../../dto/create-user.dto";
import {UsersRepository} from "../../repositories/users.repository";
import * as bcrypt from 'bcrypt'

@Injectable()
export class CreateUserService implements AbstractCreateUser {

	@Inject()
	private usersRepository: UsersRepository

	public async execute(createUserDto: CreateUserDto): Promise<User> {
		const emailIsRegistered = await this.usersRepository.checkEmail(createUserDto.email)

		if (emailIsRegistered) {
			throw new BadRequestError('Email already registered')
		}

		const userIsRegistered = await this.usersRepository.checkUserName(createUserDto.user)

		if (userIsRegistered) {
			throw new BadRequestError('User already registered')
		}


		if (createUserDto.password !== createUserDto.confirmPassword) {
			throw new BadRequestError('Passwords do not match')
		}

		const hashPassword = await bcrypt.hash(createUserDto.password, 12)

		createUserDto.password = hashPassword

		const user = await this.usersRepository.createUser(createUserDto)
		return user
	}
}

