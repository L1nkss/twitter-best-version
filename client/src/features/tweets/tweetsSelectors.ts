import { RootState } from '@app/store'
import { sortDate } from '@shared/utils/date';

export const allTweetsSelector = (state: RootState) => state.tweets.allTweets;
export const allTweetsSortedByDateSelector = (state: RootState) => {
    return state.tweets.allTweets.list.slice().sort((firstDate, secondDate) => sortDate(firstDate.createdAt, secondDate.createdAt))
}
export const likedTweetsSelector = (state: RootState) => state.tweets.likedTweets;
