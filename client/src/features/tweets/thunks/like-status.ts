import {createAsyncThunk} from '@reduxjs/toolkit';
import {deleteDoc, doc, setDoc} from 'firebase/firestore';

import { ChangesEnum } from '@features/tweets/models/enums/ChangesEnums.enum';

import { LikeStatusResponse, LikeStatusResponseWithId } from '@features/tweets/models/interfaces/TweetsThunk.interface';

import { apiClientV1 } from '@shared/utils/api-client';

import {firebaseDB} from '../../../firebase';

export const likeStatus = createAsyncThunk<LikeStatusResponse, LikeStatusResponseWithId>(
    '@tweets/like',
    async ({tweet, status, currentUserId}) => {
        await apiClientV1.post(`/tweets/like/${tweet.id}`, {
            tweet
        });

        if (status === ChangesEnum.ADD) {
            await setDoc(doc(firebaseDB, 'users', currentUserId, 'liked-tweets', tweet.id), JSON.parse(JSON.stringify(tweet)));
        }

        if (status === ChangesEnum.DELETE) {
            await deleteDoc(doc(firebaseDB, 'users', currentUserId, 'liked-tweets', tweet.id));
        }

        return {tweet, status};
    }
)