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

	public async checkId(id: string): Promise<boolean> {
		const tweet = await this.prisma.tweet.findFirst({
			where: {id}
		})

		return !!tweet
	}

	//verify if the tweet belongs to the author
	public async verifyAuthor(tweetId: string, authorId: string): Promise<boolean> {
		const tweet = await this.prisma.tweet.findFirst({
			where: {
				id: tweetId,
				AND: {
					author: {
						id: authorId
					}
				}
			}
		})

		return !!tweet
	}

	public async showTweet(id: string): Promise<Tweet> {
		const tweet = await this.prisma.tweet.findFirst({
			where: {id}
		})

		return tweet
	}

	public async showUserTweets(userId: string): Promise<Tweet[]> {
		const tweets = await this.prisma.tweet.findMany({
			where: {
				author: {
					id: userId
				},
				OR: {
					usersWhoRetweeted: {
						every: {
							id: userId
						}
					}
				}
			}
		})

		return tweets
	}

	public async delete(id: string): Promise<void> {
		await this.prisma.tweet.delete({where: {id}})
	}

}
