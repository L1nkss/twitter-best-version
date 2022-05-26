import { ITweet } from '@entities/tweet/models/interfaces/Tweet.interface'

export interface MakeTweetProps {
  addNewTweet?: (tweet: ITweet) => void
}
