import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiClientV1 } from '@shared/utils/api-client';


export const deleteTweet = createAsyncThunk<string, string>(
  '@tweets/delete',
  async (id: string) => {
    await apiClientV1.delete(`/tweets/delete2/${id}`)

    return id;
  }
)