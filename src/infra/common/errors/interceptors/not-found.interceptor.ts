import {CallHandler, ExecutionContext, NestInterceptor, NotFoundException} from "@nestjs/common";
import {catchError, Observable} from "rxjs";
import {NotFoundError} from "../types/NotFoundError";

export class NotFoundInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		return next.handle()
			.pipe(
				catchError(error => {
					if (error instanceof NotFoundError) {
						throw new NotFoundException(error.message)
					} else {
						throw error
					}
				})
			)
	}
}
