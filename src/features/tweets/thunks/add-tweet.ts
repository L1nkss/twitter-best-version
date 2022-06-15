import { createAsyncThunk } from '@reduxjs/toolkit'

import { Tweet } from '@features/tweets/models/Tweets.interface'
import { apiClient } from '@shared/utils/api-client'

export const addTweet = createAsyncThunk<Tweet, Omit<Tweet, 'id'>>(
  '@tweets/add',
  async (tweet) => {
    const response = await apiClient.post('/Tweet', tweet)

    return response.data
  }
)
