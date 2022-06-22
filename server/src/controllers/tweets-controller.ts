import {NextFunction, Request, Response} from "express";

const getTweetsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send({})
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
        res.send({});
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