import {Body, Controller, HttpCode, HttpStatus, Param, Post, Request, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {CreateTweetDto} from "src/application/tweets/dto/create-tweet.dto";
import {AbstractReplyTweet} from "src/domain/tweets/services/abstract-reply-tweet.service";

@Controller('tweets')
export class ReplyTweetController {

	constructor(
		private readonly replyTweetService: AbstractReplyTweet
	) {}

	@Post('/reply/:id')
	@HttpCode(HttpStatus.CREATED)
	@UseGuards(AuthGuard('jwt'))
	async handle(@Body() createTweetDto: CreateTweetDto, @Param('id') id: string, @Request() req: any) {
		return await this.replyTweetService.execute(createTweetDto, id, req.user)
	}

}
