import {NextFunction, Request, Response} from "express";
import { DatabaseCollections } from "../database/database.enums";
const {db} = require('../database/database');

const getUserLikedTweetsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const snapshot = await db.collection(DatabaseCollections.USERS).doc(id).collection("liked-tweets").get();
        const data = snapshot.docs.map((doc: any) => doc.data());

        res.send(data);
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getUserLikedTweetsController
}