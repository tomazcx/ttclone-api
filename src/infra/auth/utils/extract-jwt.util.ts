import {UnauthorizedException} from "@nestjs/common"
import {Request} from "express"

export const extractJwt = (request: Request): string => {
	const authorization = request.headers.authorization

	if (!authorization) {
		throw new UnauthorizedException('Missing JWT')
	}

	return authorization.split(' ')[1]
}
