import {createAsyncThunk} from '@reduxjs/toolkit';

import { ChangesEnum } from '@features/tweets/models/enums/ChangesEnums.enum';

import { LikeStatusResponse, LikeStatusResponseWithId } from '@features/tweets/models/interfaces/TweetsThunk.interface';

import { apiClientV1 } from '@shared/utils/api-client';

export const likeStatus = createAsyncThunk<LikeStatusResponse, LikeStatusResponseWithId>(
    '@tweets/like',
    async ({tweet, status, currentUserId}) => {
        await apiClientV1.post(`/tweets/like/${tweet.id}`, {
            tweet
        });

        if (status === ChangesEnum.ADD) {
            await apiClientV1.post('/user/like-tweet-add', {
                tweet,
                currentUserId
            });
        }

        if (status === ChangesEnum.DELETE) {
            await apiClientV1.delete(`/user/delete-liked-tweet/${currentUserId}/${tweet.id}`)
        }

        return {tweet, status};
    }
)