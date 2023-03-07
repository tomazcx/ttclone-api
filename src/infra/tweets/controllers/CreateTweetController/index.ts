import {Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Request} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {CreateTweetDto} from "src/application/tweets/dto/create-tweet.dto";
import {AbstractCreateTweet} from "src/domain/tweets/services/abstract-create-tweet.service";

@Controller('tweets')
export class CreateTweetController {

	constructor(
		private readonly createTweetService: AbstractCreateTweet
	) {}

	@Post()
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.CREATED)
	async handle(@Body() createTweetDto: CreateTweetDto, @Request() req: any) {
		return await this.createTweetService.execute(createTweetDto, req.user)
	}

}
