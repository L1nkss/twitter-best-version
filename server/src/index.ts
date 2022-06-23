import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const tweetsRoute = require('./routes/tweets-route');

dotenv.config();

const app: Express = express();

app.use(express.json())

const port = process.env.PORT;

app.get('/api', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});


// Routes v1
app.use('/api/v1/tweets', tweetsRoute);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});