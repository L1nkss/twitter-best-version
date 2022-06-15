import { configureStore } from '@reduxjs/toolkit'

import tweetReducer from '@features/tweets/tweetsSlice'
import userReducer from '@features/user/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    tweets: tweetReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
