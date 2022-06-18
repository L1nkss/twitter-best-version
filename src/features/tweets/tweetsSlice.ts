import { createSlice } from '@reduxjs/toolkit'

import { Tweets } from '@features/tweets/models/Tweets.interface'
import { addTweet } from '@features/tweets/thunks/add-tweet'
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
  },
})

export default tweetsSlice.reducer
