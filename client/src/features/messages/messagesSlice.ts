import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  AddMessagePayload,
  ChatMessage,
  MessagesInterface
} from '@features/messages/models/interfaces/Messages.interface';

const initialState: MessagesInterface = {
  userId: 'test',
  messages: []
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, {payload}: PayloadAction<AddMessagePayload>) => {
      const newMessage: ChatMessage = {
        content: payload.message.content,
        from: payload.message.from,
        timestamp: payload.message.timestamp,
        id: payload.message.id
      }

      // const roomIdx = state.findIndex((chat) => chat.userId === payload.roomId);
      // const roomIdx = state.userId === payload.roomId;

      // if (roomIdx === -1) {
      //   const newChat: MessagesInterface = {
      //     userId: 'test',
      //     messages: [newMessage]
      //   }
      //
      //   state.push(newChat)
      // } else {
      //   state[roomIdx].messages.push(newMessage)
      // }

      state.messages.push(newMessage)

      return state;
      // const idx = state.findIndex((chat) => chat.userId === payload.id);
      // const newMessage = {
      //   from: payload.uid,
      //   userName: payload.userName,
      //   content: payload.content
      // }
      //
      // if (idx === -1) {
      //   const newChat = {
      //     userId: payload.uid,
      //     messages: [newMessage]
      //   }
      //
      //   state.push(newChat);
      // } else {
      //   state[idx].messages.push(newMessage)
      // }
      //
      // return state;
    }
  }
})

export const {addMessage} = messagesSlice.actions;
export default messagesSlice.reducer