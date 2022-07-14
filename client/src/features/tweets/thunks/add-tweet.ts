import { createAsyncThunk } from '@reduxjs/toolkit'

import { Tweet } from '@features/tweets/models/interfaces/Tweets.interface'

import { apiClientV1 } from '@shared/utils/api-client';

export const addTweet = createAsyncThunk<Tweet, Omit<Tweet, 'id'>>(
  '@tweets/add',
  async (tweet) => {
    const response = await apiClientV1.post('/tweets/add', tweet);

    return response.data
  }
)
