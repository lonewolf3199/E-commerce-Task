import express ,{ Express, NextFunction } from "express";
import db from "../Database/config/config";
import catchAsync from "../Errorservices/catchAsync";

const User = db.users;

const toAdmin = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    if(!res.locals.user){

    }
})