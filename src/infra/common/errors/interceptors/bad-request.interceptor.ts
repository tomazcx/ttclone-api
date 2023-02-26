import {BadRequestException, CallHandler, ExecutionContext, NestInterceptor, NotFoundException} from "@nestjs/common";
import {catchError, Observable} from "rxjs";
import {BadRequestError} from "../types/BadRequestError";

export class BadRequestInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		return next.handle()
			.pipe(
				catchError(error => {
					if (error instanceof BadRequestError) {
						throw new BadRequestException(error.message)
					} else {
						throw error
					}
				})
			)
	}
}
