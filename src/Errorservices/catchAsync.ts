import express ,{ Express, Request, Response, NextFunction} from "express";

export default (asyncFn: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await asyncFn(req, res, next).catch(next)
    }
}

