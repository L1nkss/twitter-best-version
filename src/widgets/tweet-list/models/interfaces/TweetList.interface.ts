import { ITweet } from '@entities/tweet/models/interfaces/Tweet.interface'

export interface TweetListProps {
  tweets: ITweet[]
  deleteTweet?: (id: string) => void
}
