import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import 'dotenv/config'
import {ValidationPipe} from '@nestjs/common';
import {NotFoundInterceptor} from './infra/common/errors/interceptors/not-found.interceptor';
import {BadRequestInterceptor} from './infra/common/errors/interceptors/bad-request.interceptor';
import {UnprocessableEntityInterceptor} from './infra/common/errors/interceptors/unprocessable-entity.interceptor';
import {ForbiddenInterceptor} from './infra/common/errors/interceptors/forbidden.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true
	}))

	app.useGlobalInterceptors(new NotFoundInterceptor())
	app.useGlobalInterceptors(new BadRequestInterceptor())
	app.useGlobalInterceptors(new UnprocessableEntityInterceptor())
	app.useGlobalInterceptors(new ForbiddenInterceptor)

	await app.listen(3000);
}
bootstrap();
