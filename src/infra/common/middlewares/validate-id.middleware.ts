import {Injectable, NestMiddleware, UnprocessableEntityException} from "@nestjs/common";
import {Request, Response} from "express";
import {NextFunction} from "express";

@Injectable()
export class ValidateIdMiddleware implements NestMiddleware {

	use(req: Request, res: Response, next: NextFunction) {
		const {id} = req.params
		const v4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

		if (v4.test(id) === false) {
			throw new UnprocessableEntityException('Invalid UUID')
		}

		next()

	}

}
