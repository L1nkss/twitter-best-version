import { ITweet } from '@entities/tweet/models/interfaces/Tweet.interface'
import { Tweet } from '@features/tweets/models/Tweets.interface'

export interface TweetListProps {
  tweets: Tweet[]
  deleteTweet?: (id: string) => void
}
