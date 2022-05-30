import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '@features/user/models/User.interface'
import { UserInitialState } from '@features/user/models/UserInitialState.interface'

const initialState: UserInitialState = {
  userName: '',
  avatarUrl: '',
  isVerify: false,
  name: '',
  createdAt: null,
  id: '',
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

export const { setUser } = userSlice.actions

export default userSlice.reducer
