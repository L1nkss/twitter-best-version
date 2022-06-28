const users: User[] = [];

// todo перенести итерфейс
export interface User {
  connections: string[];
  rooms: string[];
  id: string;
  name: string;
  avatarUrl: string;
}

const isUserExist = (id: string): Boolean => users.findIndex((user) => user.id === id) !== -1;
const getUserIdx = (id: string): number => users.findIndex((user) => user.id === id);
const getAllUsersConnection = (userId: string): string[] => users.find((user) => user.id === userId)!.connections;


const addRoomToUser = (userId: string, roomId: string) => {
  const idx = getUserIdx(userId);

  if (idx !== -1) {
    users[idx].rooms.push(roomId);
  }
}

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
    rooms: [],
    connections: [socketId]
  }

  users.push(newUser);
}

module.exports = {addUser, isUserExist, addConnectionToUser, removeConnection, addRoomToUser, getAllUsersConnection}