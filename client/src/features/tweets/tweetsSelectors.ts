import { RootState } from '@app/store'

export const allTweets = (state: RootState) => state.tweets.allTweets
export const likedTweets = (state: RootState) => state.tweets.likedTweets;
