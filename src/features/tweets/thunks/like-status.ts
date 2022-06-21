import {createAsyncThunk} from '@reduxjs/toolkit';
import {deleteDoc, doc, setDoc, updateDoc} from 'firebase/firestore';

import {Tweet} from '@features/tweets/models/Tweets.interface';

import {firebaseDB} from '../../../firebase';

type ChangeLikeStatus = 'add' | 'delete';

interface LikeStatusResponse {
    tweet: Tweet;
    status: ChangeLikeStatus;
    currentUserId: string
}

export const likeStatus = createAsyncThunk<Omit<LikeStatusResponse, 'currentUserId'>, LikeStatusResponse>(
    '@tweets/like',
    async ({tweet, status, currentUserId}) => {
        await updateDoc(doc(firebaseDB, 'tweets', tweet.id), JSON.parse(JSON.stringify(tweet)));

        if (status === 'add') {
            await setDoc(doc(firebaseDB, 'users', currentUserId, 'liked-tweets', tweet.id), JSON.parse(JSON.stringify(tweet)));
        }

        if (status === 'delete') {
            await deleteDoc(doc(firebaseDB, 'users', currentUserId, 'liked-tweets', tweet.id));
        }

        return {tweet, status};
    }
)