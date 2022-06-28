export interface ChatMessage {
  content: string,
  from: {
    id: string,
    name: string,
    avatarUrl: string
  },
  timestamp: Date
}

export interface MessagesInterface {
  userId: string, // или room?
  messages: ChatMessage[]
}

export interface AddMessagePayload {
  roomId: string // или юзер?
  message: ChatMessage
}