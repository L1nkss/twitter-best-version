import { RootState } from '@app/store'

export const allTweetsSelector = (state: RootState) => state.tweets.allTweets
export const likedTweetsSelector = (state: RootState) => state.tweets.likedTweets;
