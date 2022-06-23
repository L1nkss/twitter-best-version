import {createAsyncThunk} from '@reduxjs/toolkit';

import {Tweet} from '@features/tweets/models/interfaces/Tweets.interface';

import { apiClientV1 } from '@shared/utils/api-client';


export const loadLikesTweets = createAsyncThunk<Tweet[], string>(
    '@user/likedTweets',
    async (userId) => {
        const response = await apiClientV1.get(`/user/liked/${userId}`);

        return response.data;
    }
);