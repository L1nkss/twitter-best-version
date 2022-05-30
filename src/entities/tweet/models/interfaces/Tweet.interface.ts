import { User } from '@features/user/models/User.interface'

export interface TweetInfo {
  comments: number
  likes: number
  retweets: number
}

export interface ITweet {
  id: string
  createdAt: Date | string
  content: string
  userInfo: User
  tweetInfo: TweetInfo
}
