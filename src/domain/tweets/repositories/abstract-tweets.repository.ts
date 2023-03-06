import {Tweet} from "../entities/Tweet";
import {CreateTweetDto} from "src/application/tweets/dto/create-tweet.dto";
import {RetweetDto} from "src/application/tweets/dto/retweet.dto";
import {User} from "src/domain/users/entities/User";

export abstract class AbstractTweetsRepository {
	abstract create(createTweetDto: CreateTweetDto, authorId: string): Promise<Tweet>
	abstract verifyAuthor(tweetId: string, authorId: string): Promise<boolean>
	abstract checkId(id: string): Promise<boolean>
	abstract replyTweet(tweetId: string, authorId: string, createTweetDto: CreateTweetDto): Promise<Tweet>
	abstract showTweet(id: string): Promise<Tweet>
	abstract showFeed(userId: string): Promise<Tweet[]>
	abstract showReplies(tweetId: string): Promise<Tweet[]>
	abstract showSavedTweets(userId: string): Promise<Tweet[]>
	abstract showWhoLiked(tweetId: string): Promise<User[]>
	abstract showWhoRetweeted(tweetId: string): Promise<Tweet[]>
	abstract showLikedTweets(userId: string): Promise<Tweet[]>
	abstract showUserTweets(userId: string): Promise<Tweet[]>
	abstract saveTweet(tweetId: string, userWhoSaveId: string): Promise<void>
	abstract removeSavedTweet(tweetId: string, userWhoSavedId: string): Promise<void>
	abstract retweet(tweetId: string, userWhoRetweetsId: string, retweetDto: RetweetDto): Promise<void>
	abstract removeRetweet(tweetId: string, userId: string): Promise<void>
	abstract likeTweet(tweetId: string, userWhoLikesId: string): Promise<void>
	abstract removeLikeTweet(tweetId: string, userWhoUnlikesId: string): Promise<void>
	abstract delete(id: string): Promise<void>
}
