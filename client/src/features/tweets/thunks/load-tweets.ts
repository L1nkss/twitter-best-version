import {createAsyncThunk} from '@reduxjs/toolkit'

import {Tweet} from '@features/tweets/models/interfaces/Tweets.interface'

import { apiClientV1 } from '@shared/utils/api-client';

export const loadTweets = createAsyncThunk<Tweet[]>(
    '@tweets/load',
    async () => {
        const response = await apiClientV1.get('/tweets/list');

        return response.data
    }
)
