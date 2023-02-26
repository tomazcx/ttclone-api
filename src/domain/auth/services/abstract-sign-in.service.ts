import {SignInDto} from "src/application/auth/dto/sign-in.dto";

export abstract class AbstractSignIn {
	abstract execute(signInDto: SignInDto): Promise<string>
}
