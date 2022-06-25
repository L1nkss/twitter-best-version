import { io } from 'socket.io-client';

const URL = 'http://localhost:3001/'
const socket = io(URL, { autoConnect: false });

// Для разработки
socket.onAny((event, ...args) => {
    console.log(event, args);
});

export {socket}