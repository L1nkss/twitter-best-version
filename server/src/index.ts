import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const tweetsRoutes = require('./routes/tweets-route');
const userRoutes = require('./routes/user-route');

dotenv.config();

const app: Express = express();

app.use(express.json())

const port = process.env.PORT;

app.get('/api', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

// Routes v1
app.use('/api/v1/tweets', tweetsRoutes);
app.use('/api/v1/user', userRoutes);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});