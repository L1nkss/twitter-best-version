import express, { Express } from 'express';
import { Socket } from "socket.io";
import { ChatEventsEnum } from './models/enums/Chat-events.enum';
import { User } from './controllers/user';
const {addUser, isUserExist, addConnectionToUser, removeConnection, addRoomToUser, getAllUsersConnection} = require('./controllers/user');

const app: Express = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

interface PrivateMessageResponse {
    message: string,
    to: {
        id: string,
        name: string,
        roomId: string
    },
    timestamp: Date,
    from: User
}

io.on(ChatEventsEnum.CONNECTION, (socket: Socket) => {
    // Подключился новый пользователь или новое соединение существующего пользователя
    if (isUserExist(socket.handshake.auth.id)) {
        addConnectionToUser(socket.handshake.auth.id, socket.id)
    } else {
        addUser({
            id: socket.handshake.auth.id,
            name: socket.handshake.auth.name,
            avatarUrl: socket.handshake.auth.avatarUrl
        }, socket.id)
    }

    socket.on(ChatEventsEnum.JOIN, (roomId: string, userId: string) => {
        addRoomToUser(userId, roomId);
    })

    socket.conn.on(ChatEventsEnum.CLOSE, () => {
        removeConnection(socket.handshake.auth.id, socket.id);
    })

    socket.on(ChatEventsEnum.DISCONNECT, () => {
        removeConnection(socket.handshake.auth.id, socket.id);
    })

    socket.on(ChatEventsEnum.PRIVATE_MESSAGE, (response: PrivateMessageResponse) => {
        console.log('response', response);
        const userConnections = getAllUsersConnection(response.to.id);

        userConnections.forEach((connection: string) => {
            socket.to(connection).emit(ChatEventsEnum.PRIVATE_MESSAGE, {
                message: response.message,
                from: response.from,
                timestamp: response.timestamp
            })
        })
    })
});

app.use(express.json());

server.listen(3001, () => {
    console.log(`⚡️[server socket]: Server is running at http://localhost:3001`);
})