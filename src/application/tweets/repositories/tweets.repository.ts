import {Injectable} from "@nestjs/common";
import {Tweet} from "src/domain/tweets/entities/Tweet";
import {AbstractTweetsRepository} from "src/domain/tweets/repositories/abstract-tweets.repository";
import {PrismaService} from "src/external/services/prisma.service";
import {CreateTweetDto} from "../dto/create-tweet.dto";

@Injectable()
//@ts-expect-error not implementing all methods at the same time
export class TweetsRepository implements AbstractTweetsRepository {

	constructor(private readonly prisma: PrismaService) {}

	public async create({content}: CreateTweetDto, authorId: string): Promise<Tweet> {
		const tweet = await this.prisma.tweet.create({
			data: {
				content,
				authorId,
				created_at: new Date()
			}
		})

		return tweet
	}

}
