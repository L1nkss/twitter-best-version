import {createAsyncThunk} from '@reduxjs/toolkit';

import {Tweet} from '@features/tweets/models/Tweets.interface';
import {apiClient} from '@shared/utils/api-client';

export const likeStatus = createAsyncThunk<string, Tweet>(
    '@tweets/like',
    async (tweet) => {
        const response = await apiClient.post(`Tweet/${tweet.id}`)
        console.log('response', response)
        return '';
    }
)