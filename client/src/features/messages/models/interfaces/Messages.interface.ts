export interface MessagesInterface {
  userId: string,
  messages: {
    from: string,
    userName: string,
    content: string
  }[]
}