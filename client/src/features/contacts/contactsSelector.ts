import { RootState } from '@app/store';

export const contactsSelector = (state: RootState) => state.contacts.list;