export interface ChatMessage {
  content: string,
  id: string,
  from: {
    id: string,
    name: string,
    avatarUrl: string
  },
  timestamp: string
}

export interface MessagesInterface {
  roomId: string, // или room?
  messages: ChatMessage[]
}

export interface AddMessagePayload {
  roomId: string // или юзер?
  message: ChatMessage
}