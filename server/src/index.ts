import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
const tweetsRoutes = require('./routes/tweets-route');
const userRoutes = require('./routes/user-route');
const app: Express = express();
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

interface ISocket extends Socket {
    userName?: string;
    // other additional attributes here, example:
    // surname?: string;
}

const users: any[] = [];

// Socket io
io.use(((socket: ISocket, next: (err?: ExtendedError) => void) => {
    socket.userName = socket.handshake.auth.userName;
    next()
}))
io.on('connection', (socket: Socket) => {
    console.log('User connected', socket.id);

    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            userID: id,
            userName: socket.handshake.auth.userName,
        });
    }
    console.log('users', users);

    socket.on('message', (mgs) => {
        io.emit('client message', mgs)
    })

    socket.on('get-users', () => {
        socket.emit("users", users);
    })
});

dotenv.config();

app.use(express.json())


app.get('/api', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

// Routes v1
app.use('/api/v1/tweets', tweetsRoutes);
app.use('/api/v1/user', userRoutes);

server.listen(process.env.PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`);
});