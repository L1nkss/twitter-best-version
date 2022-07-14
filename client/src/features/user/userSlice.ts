import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '@features/user/models/User.interface'

const initialState: User = {
  nickName: '',
  avatarUrl: '',
  isVerify: false,
  name: '',
  createdAt: undefined,
  uid: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state = action.payload

      return state
    },
  },
})

export const {setUser} = userSlice.actions

export default userSlice.reducer
