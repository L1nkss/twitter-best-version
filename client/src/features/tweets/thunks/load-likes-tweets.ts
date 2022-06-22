import {createAsyncThunk} from '@reduxjs/toolkit';
import {getDocs, collection} from 'firebase/firestore';

import {Tweet} from '@features/tweets/models/Tweets.interface';

import {firebaseDB} from '../../../firebase';

export const loadLikesTweets = createAsyncThunk<Tweet[], string>(
    '@user/likedTweets',
    async (userId) => {
        const querySnapshot = await getDocs(collection(firebaseDB, 'users', userId, 'liked-tweets'));
        const tweets: Tweet[] = [];

        querySnapshot.forEach((doc) => {
            tweets.push(doc.data() as Tweet);
        })

        return tweets;
    }
);