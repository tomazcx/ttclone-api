import {sign} from "jsonwebtoken";

export const generateJwt = (id: string): string => {
	return sign({
		id
	}, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN
	})
}
