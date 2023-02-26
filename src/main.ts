import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import 'dotenv/config'
import {ValidationPipe} from '@nestjs/common';
import {NotFoundInterceptor} from './infra/common/errors/interceptors/not-found.interceptor';
import {BadRequestInterceptor} from './infra/common/errors/interceptors/bad-request.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true
	}))

	app.useGlobalInterceptors(new NotFoundInterceptor())
	app.useGlobalInterceptors(new BadRequestInterceptor())

	await app.listen(3000);
}
bootstrap();