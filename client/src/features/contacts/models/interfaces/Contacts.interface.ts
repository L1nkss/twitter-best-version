export interface Contact {
  id: string,
  name: string,
  avatarUrl: string
  roomId: string
}

export interface Contacts {
  list: Contact[]
}