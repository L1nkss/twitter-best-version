import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Socket } from "socket.io";
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

// Socket io
io.on('connection', (socket: Socket) => {
    socket.on('message', (mgs) => {
        io.emit('client message', mgs)
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