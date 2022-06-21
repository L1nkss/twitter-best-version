import {RootState} from '@app/store'

export const userSelector = (state: RootState) => state.user
export const userIdSelector = (state: RootState) => state.user.uid;