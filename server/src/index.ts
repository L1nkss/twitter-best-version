import express, { Express } from 'express';
import dotenv from 'dotenv';

const tweetsRoutes = require('./routes/tweets-route');
const userRoutes = require('./routes/user-route');
const app: Express = express();

dotenv.config();

app.use(express.json())

// Routes v1
app.use('/api/v1/tweets', tweetsRoutes);
app.use('/api/v1/user', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`);
});