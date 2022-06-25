import {NextFunction, Request, Response} from "express";
import { DatabaseCollections } from "../database/database.enums";
const {db} = require('../database/database');

const getUserLikedTweetsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const snapshot = await db.collection(DatabaseCollections.USERS).doc(id).collection(DatabaseCollections.USER_LIKED_TWEETS).get();
        const data = snapshot.docs.map((doc: any) => doc.data());

        res.send(data);
    } catch (err) {
        next(err)
    }
}

const addTweetToLikedTweetsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {currentUserId, tweet} = req.body;
        await db.collection(DatabaseCollections.USERS).doc(currentUserId).collection(DatabaseCollections.USER_LIKED_TWEETS).doc(tweet.id).set(tweet)

        res.sendStatus(200);
    } catch (err) {

    }
}

const deleteTweetFromLikedController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId, tweetId} = req.params;
        await db.collection(DatabaseCollections.USERS).doc(userId).collection(DatabaseCollections.USER_LIKED_TWEETS).doc(tweetId).delete();

        res.sendStatus(200);
    } catch (e) {

    }
}

module.exports = {
    getUserLikedTweetsController,
    addTweetToLikedTweetsController,
    deleteTweetFromLikedController
}