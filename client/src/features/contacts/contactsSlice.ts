import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Contact, Contacts } from '@features/contacts/models/interfaces/Contacts.interface';

const initialState: Contacts = {
  list: []
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, {payload}: PayloadAction<Contact>) => {
      const idx = state.list.findIndex((contact) => contact.id === payload.id);

      if (idx === -1) {
        state.list.push(payload);
      }

      return state;
    }
  }
})

export const {addContact} = contactsSlice.actions;
export default contactsSlice.reducer;