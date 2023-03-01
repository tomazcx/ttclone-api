import {CallHandler, ExecutionContext, NestInterceptor, UnprocessableEntityException} from "@nestjs/common";
import {catchError, Observable} from "rxjs";
import {UnprocessableEntityError} from "../types/UnprocessableEntityError";

export class UnprocessableEntityInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		return next.handle()
			.pipe(
				catchError(error => {
					if (error instanceof UnprocessableEntityError) {
						throw new UnprocessableEntityException(error.message)
					} else {
						throw error
					}
				})
			)
	}
}
