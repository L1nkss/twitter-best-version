import { RootState } from '@app/store';

export const messagesSelector = (state: RootState) => state.messages.messages;