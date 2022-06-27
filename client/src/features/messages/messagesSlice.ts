import { createSlice } from '@reduxjs/toolkit';

import { MessagesInterface } from '@features/messages/models/interfaces/Messages.interface';

const initialState: MessagesInterface[] = [];

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, {payload}) => {
      const idx = state.findIndex((chat) => chat.userId === payload.uid);
      const newMessage = {
        from: payload.uid,
        userName: payload.userName,
        content: payload.content
      }

      if (idx === -1) {
        const newChat = {
          userId: payload.uid,
          messages: [newMessage]
        }

        state.push(newChat);
      } else {
        state[idx].messages.push(newMessage)
      }

      return state;
    }
  }
})

export const {addMessage} = messagesSlice.actions;
export default messagesSlice.reducer