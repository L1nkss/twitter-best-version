import {createAsyncThunk} from '@reduxjs/toolkit';

import {apiClient} from '@shared/utils/api-client';

export const deleteTweet = createAsyncThunk<string, string>(
    '@tweets/delete',
    async (id: string) => {
        const response = await apiClient.delete(`/Tweet/${id}`,{
            withCredentials: false,
        })

        return response.data.id;
    }
)