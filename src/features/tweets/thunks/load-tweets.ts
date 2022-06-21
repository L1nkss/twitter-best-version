import {createAsyncThunk} from '@reduxjs/toolkit'
import {collection, getDocs} from 'firebase/firestore';

import {Tweet} from '@features/tweets/models/Tweets.interface'

import {firebaseDB} from '../../../firebase';

export const loadTweets = createAsyncThunk<Tweet[]>(
    '@tweets/load',
    async () => {
        const querySnapshot = await getDocs(collection(firebaseDB, 'tweets'));
        const tweets: Tweet[] = [];

        querySnapshot.forEach((doc) => {
            tweets.push(doc.data() as Tweet);
        })

        return tweets;
    }
)
