const users: User[] = [];
const rooms: RoomsInterface = {};

// todo перенести итерфейс
export interface User {
  connections: string[];
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Room {
  message: {
    message: string,
    timestamp: Date,
    from: User
  }
}

export interface RoomsInterface {
  [key: string]: Room[]
}


const isUserExist = (id: string): Boolean => users.findIndex((user) => user.id === id) !== -1;
const getUserIdx = (id: string): number => users.findIndex((user) => user.id === id);
const getAllUsersConnection = (userId: string): string[] => users.find((user) => user.id === userId)!.connections;


const addRoom = (roomId: string) => {
  rooms[roomId] = [];
}

const isRoomExist = (roomId: string) => Boolean(rooms[roomId])

const addConnectionToUser = (userId: string, socketId: string) => {
  const idx = getUserIdx(userId);

  if (idx !== -1) {
    users[idx].connections.push(socketId);
  }
}

const removeConnection = (userId: string, socketId: string) => {
  const idx = getUserIdx(userId);

  if (idx !== -1) {
    users[idx].connections = users[idx].connections.filter((connection) => connection !== socketId);
  }
}

const addUser = ({id, name, avatarUrl}: User, socketId: string): void => {
  const newUser: User = {
    id,
    name,
    avatarUrl,
    connections: [socketId]
  }

  users.push(newUser);
}

module.exports = {addUser, isUserExist, addConnectionToUser, removeConnection, addRoom, getAllUsersConnection, isRoomExist}