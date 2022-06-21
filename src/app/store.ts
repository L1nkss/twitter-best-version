import { configureStore } from '@reduxjs/toolkit'

import {useDispatch} from 'react-redux';

import tweetReducer from '@features/tweets/tweetsSlice'
import userReducer from '@features/user/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    tweets: tweetReducer,
  },
})

export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
