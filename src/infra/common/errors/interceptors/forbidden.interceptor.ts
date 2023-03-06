import {CallHandler, ExecutionContext, ForbiddenException, NestInterceptor} from "@nestjs/common";
import {catchError, Observable} from "rxjs";
import {ForbiddenError} from "../types/ForbiddenError";

export class ForbiddenInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		return next.handle()
			.pipe(
				catchError(error => {
					if (error instanceof ForbiddenError) {
						throw new ForbiddenException(error.message)
					} else {
						throw error
					}
				})
			)
	}
}
