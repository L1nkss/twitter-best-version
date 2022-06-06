import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@app/store'
import { User } from '@features/user/models/User.interface'
import { UserInitialState } from '@features/user/models/UserInitialState.interface'

const initialState: UserInitialState = {
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

export const { setUser } = userSlice.actions
export const userSelector = (state: RootState) => state.user

export default userSlice.reducer
