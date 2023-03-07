import {Injectable} from "@nestjs/common";
import {excludeField} from "src/application/users/utils/exclude-field.util";
import {Tweet} from "src/domain/tweets/entities/Tweet";
import {TweetUserRelation} from "src/domain/tweets/entities/TweetUserRelation";
import {AbstractTweetsRepository} from "src/domain/tweets/repositories/abstract-tweets.repository";
import {User} from "src/domain/users/entities/User";
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

	public async verifyIfUserLiked(tweetId: string, userId: string): Promise<boolean> {
		const userLike = await this.prisma.usersLikes.findFirst({
			where: {
				tweet: {
					id: tweetId
				},
				AND: {
					user: {
						id: userId
					}
				}
			}
		})

		return !!userLike
	}

	public async verifyIfUserSaved(tweetId: string, userId: string): Promise<boolean> {
		const userSave = await this.prisma.userSavedTweets.findFirst({
			where: {
				savedTweet: {
					id: tweetId
				},
				AND: {
					user: {
						id: userId
					}
				}
			}
		})

		return !!userSave

	}

	public async verifyIfUserRetweeted(tweetId: string, userId: string): Promise<boolean> {
		const userRetweet = await this.prisma.userRetweets.findFirst({
			where: {
				tweet: {
					id: tweetId
				},
				AND: {
					user: {
						id: userId
					}
				}
			}
		})

		return !!userRetweet
	}

	public async showSavedTweets(userId: string): Promise<Tweet[]> {
		const savedTweets = await this.prisma.userSavedTweets.findMany({
			where: {
				userId
			},
			include: {
				savedTweet: {
					include: {
						author: true
					}
				},
			}
		}) as any

		const tweets = savedTweets.map(savedTweets => savedTweets.savedTweet)

		return tweets
	}

	public async showTweet(id: string): Promise<Tweet> {
		const tweet = await this.prisma.tweet.findFirst({
			where: {id},
			include: {
				author: true
			}
		})

		return tweet
	}

	public async showLikedTweets(userId: string): Promise<Tweet[]> {
		const likes = await this.prisma.usersLikes.findMany({
			where: {
				userId
			},
			include: {
				tweet: {
					include: {
						author: true
					}
				}
			}
		})

		const tweets = likes.map(like => like.tweet)

		return tweets
	}

	public async showWhoRetweeted(tweetId: string): Promise<User[]> {
		const retweets = await this.prisma.userRetweets.findMany({
			where: {
				tweetId
			},
			include: {
				user: true
			}
		})

		const usersWithouthPassword = retweets.map((retweet: TweetUserRelation) => {
			return excludeField(retweet.user, ['password'])
		})

		return usersWithouthPassword
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
							userId
						}
					}
				}
			}
		})

		return tweets
	}

	public async showWhoLiked(tweetId: string): Promise<User[]> {
		const likes = await this.prisma.usersLikes.findMany({
			where: {tweetId},
			include: {
				user: true
			}
		}) as TweetUserRelation[]

		const usersWithouthPassword = likes.map((like: TweetUserRelation) => {
			return excludeField(like.user, ['password'])
		})

		return usersWithouthPassword
	}

	public async likeTweet(tweetId: string, userWhoLikesId: string): Promise<void> {
		await this.prisma.usersLikes.create({
			data: {
				tweet: {
					connect: {id: tweetId}
				},
				user: {
					connect: {id: userWhoLikesId}
				},
				created_at: new Date
			}
		})
	}

	public async removeLikeTweet(tweetId: string, userWhoUnlikesId: string): Promise<void> {
		await this.prisma.user.update({
			where: {
				id: userWhoUnlikesId
			},
			data: {
				likedTweets: {
					deleteMany: {
						tweetId,
						userId: userWhoUnlikesId
					}
				}
			}
		})
	}

	public async saveTweet(tweetId: string, userWhoSaveId: string): Promise<void> {
		await this.prisma.userSavedTweets.create({
			data: {
				savedTweet: {
					connect: {id: tweetId}
				},
				user: {
					connect: {id: userWhoSaveId}
				},
				created_at: new Date
			}
		})
	}

	public async removeSavedTweet(tweetId: string, userWhoSavedId: string): Promise<void> {
		await this.prisma.user.update({
			where: {
				id: userWhoSavedId
			},
			data: {
				savedTweets: {
					deleteMany: {
						tweetId,
						userId: userWhoSavedId
					}
				}
			}
		})
	}

	public async retweet(tweetId: string, userWhoRetweetsId: string): Promise<void> {
		await this.prisma.userRetweets.create({
			data: {
				tweet: {
					connect: {id: tweetId}
				},
				user: {
					connect: {id: userWhoRetweetsId}
				},
				created_at: new Date
			}
		})
	}

	public async removeRetweet(tweetId: string, userId: string): Promise<void> {
		await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				tweetsRetweeted: {
					deleteMany: {
						tweetId: tweetId,
						userId
					}
				}
			}
		})
	}

	public async delete(id: string): Promise<void> {
		await this.prisma.tweet.delete({where: {id}})
	}

}
