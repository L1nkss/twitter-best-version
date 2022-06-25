import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    Notification,
    Notifications,
    NotificationWithId
} from '@features/notifications/models/interfaces/Notifications.interface';
import { makeRandomString } from '@shared/utils/makeRandomString';

const initialState: Notifications = {
    list: []
}

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Notification>) => {
            const notifyWithId: NotificationWithId = {id: makeRandomString(10), ...action.payload};
            state.list = [...state.list, notifyWithId];

            return state;
        },
        deleteNotification: (state, {payload}) => {
            state.list = state.list.filter((notification) => notification.id !== payload);

            return state;
        }
    }
})

export const { addNotification, deleteNotification } = notificationsSlice.actions
export default notificationsSlice.reducer;