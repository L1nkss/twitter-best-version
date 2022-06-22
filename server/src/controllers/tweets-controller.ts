import {NextFunction, Request, Response} from "express";

const getTweetsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send({})
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getTweetsController
}