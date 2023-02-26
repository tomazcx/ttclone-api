import {Inject, Injectable} from "@nestjs/common";
import {AbstractSignIn} from "src/domain/auth/services/abstract-sign-in.service";
import {BadRequestError} from "src/infra/common/errors/types/BadRequestError";
import {SignInDto} from "../../dto/sign-in.dto";
import {AuthRepository} from "../../repositories/auth.repository";
import * as bcrypt from 'bcrypt'
import {generateJwt} from "../../utils/generate-jwt.util";

@Injectable()
export class SignInService implements AbstractSignIn {

	@Inject()
	private authRepository: AuthRepository

	public async execute({email, password}: SignInDto): Promise<string> {
		const emailExists = await this.authRepository.checkEmail(email)

		if (!emailExists) {
			throw new BadRequestError('Invalid credentials')
		}

		const authCredentials = await this.authRepository.getAuthCredentials(email)

		const validPassword = await bcrypt.compare(password, authCredentials.password)

		if (!validPassword) {
			throw new BadRequestError('Invalid credentials')
		}

		return generateJwt(authCredentials.id)

	}
}
