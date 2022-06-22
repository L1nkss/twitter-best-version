import {createAsyncThunk} from '@reduxjs/toolkit'

import { doc, setDoc } from 'firebase/firestore';

import {Tweet} from '@features/tweets/models/Tweets.interface'

import {makeRandomString} from '@shared/utils/makeRandomString';

import {firebaseDB} from '../../../firebase';

export const addTweet = createAsyncThunk<Tweet, Omit<Tweet, 'id'>>(
    '@tweets/add',
    async (tweet) => {
        const tweetId = makeRandomString(20);
        const updatedTweet = {id: tweetId, ...tweet};
        await setDoc(doc(firebaseDB, 'tweets', tweetId), JSON.parse(JSON.stringify(updatedTweet)));

        return updatedTweet
    }
)
