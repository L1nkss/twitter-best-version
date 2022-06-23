import {NextFunction, Request, Response} from "express";
import { DatabaseCollections } from "../database/database.enums";
const {db} = require('../database/database');

const getTweetsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const snapshot = await db.collection(DatabaseCollections.TWEETS).get();
        const data = snapshot.docs.map((doc: any) => doc.data());
        res.send(data);
    } catch (err) {
        next(err);
    }
}

const addTweetController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send({});
    } catch (err) {
        next(err)
    }
}

const deleteTweetController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send({});
    } catch (err) {
        next(err)
    }
}

const likeTweetController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const {tweet} = req.body;
        const docRef = await db.collection(DatabaseCollections.TWEETS).doc(id);
        const doc = await docRef.get();

        await doc.ref.set(tweet);

        res.sendStatus(200);
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getTweetsController,
    addTweetController,
    deleteTweetController,
    likeTweetController
}