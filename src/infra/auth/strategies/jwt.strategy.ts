import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from 'passport-jwt'
import {extractJwt} from "../utils/extract-jwt.util";
import {ValidateUserService} from "src/application/auth/services/ValidateUserService";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly validateUserService: ValidateUserService
	) {
		super({
			jwtFromRequest: extractJwt,
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET
		})
	}

	async validate({id}: {id: string}): Promise<string> {
		const user = await this.validateUserService.execute(id)
		return user.id
	}
}
