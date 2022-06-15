import { createAsyncThunk } from '@reduxjs/toolkit'

import { Tweet } from '@features/tweets/models/Tweets.interface'
import { apiClient } from '@shared/utils/api-client'

export const loadTweets = createAsyncThunk<Tweet[]>(
  '@tweets/load',
  async () => {
    const response = await apiClient.get<Tweet[]>('/Tweet')

    return response.data
  }
)
