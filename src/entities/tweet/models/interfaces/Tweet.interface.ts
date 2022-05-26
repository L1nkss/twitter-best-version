export interface UserInfo {
  userName: string
  avatarUrl: string
  isVerify: boolean
  name: string
}

export interface TweetInfo {
  comments: number
  likes: number
  retweets: number
}

export interface ITweet {
  id: string
  createdAt: Date | string
  content: string
  userInfo: UserInfo
  tweetInfo: TweetInfo
}
