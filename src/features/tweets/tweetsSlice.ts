import { createSlice } from '@reduxjs/toolkit'

import { Tweets } from '@features/tweets/models/Tweets.interface'
import { addTweet } from '@features/tweets/thunks/add-tweet'
import {deleteTweet} from '@features/tweets/thunks/delete-tweet';
import {likeStatus} from '@features/tweets/thunks/like-status';
import {loadLikesTweets} from '@features/tweets/thunks/load-likes-tweets';
import { loadTweets } from '@features/tweets/thunks/load-tweets'

const initialState: Tweets = {
  likedTweets: [],
  allTweets: {
    list: [],
    loading: false,
    error: null,
  },
}

export const tweetsSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Загрузка твитов
    builder.addCase(loadTweets.pending, (state) => {
      state.allTweets.loading = true
      state.allTweets.error = null
    })
    builder.addCase(loadTweets.fulfilled, (state, { payload }) => {
      state.allTweets.list = payload
      state.allTweets.loading = false
    })
    builder.addCase(loadTweets.rejected, (state, { payload }) => {
      if (payload) {
        // state.allTweets.error = payload.message
      }
      state.allTweets.loading = false
    })
    // Добавление твита
    builder.addCase(addTweet.fulfilled, (state, { payload }) => {
      state.allTweets.list.push(payload)
    })
    // Удаление твита
    builder.addCase(deleteTweet.fulfilled, (state, {payload}) => {
      state.allTweets.list = state.allTweets.list.filter((tweet) => tweet.id !== payload);
    })
    // Загрузка лайкнутых твитов пользователя
    builder.addCase(loadLikesTweets.fulfilled, (state, {payload}) => {
      state.likedTweets = payload;
    })
    // Лайкнуть твит
    builder.addCase(likeStatus.fulfilled, (state, {payload}) => {
      const idx = state.allTweets.list.findIndex((tw) => tw.id === payload.tweet.id);
      state.allTweets.list[idx] = payload.tweet;

      if (payload.status === 'add') {
        state.likedTweets.push(payload.tweet)
      }

      if (payload.status === 'delete') {
        state.likedTweets = state.likedTweets.filter((tw) => tw.id !== payload.tweet.id);
      }
    })
  },
})

export default tweetsSlice.reducer
