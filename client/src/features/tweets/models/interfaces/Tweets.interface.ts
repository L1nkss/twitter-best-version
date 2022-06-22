import { User } from '@features/user/models/User.interface'

export interface TweetInfo {
  comments: number
  likes: number
  retweets: number
}

export interface Tweet {
  id: string
  createdAt: Date | string
  content: string
  userInfo: Omit<User, 'createdAt'>
  tweetInfo: TweetInfo
}

export interface Tweets {
  allTweets: {
    loading: boolean
    error: null | string
    list: Tweet[]
  }
  likedTweets: Tweet[]
}
