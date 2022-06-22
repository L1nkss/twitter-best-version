import {createAsyncThunk} from '@reduxjs/toolkit';

import { doc, deleteDoc } from 'firebase/firestore';

import {firebaseDB} from '../../../firebase';


export const deleteTweet = createAsyncThunk<string, string>(
    '@tweets/delete',
    async (id: string) => {
        await deleteDoc(doc(firebaseDB, 'tweets', id));

        return id;
    }
)