import {Body, Request, Controller, HttpCode, HttpStatus, Param, Post, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {CreateTweetDto} from "src/application/tweets/dto/create-tweet.dto";
import {AbstractRetweetWithComment} from "src/domain/tweets/services/abstract-retweet-with-comment.service";

@Controller('tweets')
export class RetweetWithCommentController {

	constructor(
		private readonly retweetWitCommentService: AbstractRetweetWithComment
	) {}

	@Post('/:id')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.CREATED)
	async handle(@Body() createTweetDto: CreateTweetDto, @Param('id') id: string, @Request() req: any) {
		await this.retweetWitCommentService.execute(createTweetDto, id, req.user)
	}

}
