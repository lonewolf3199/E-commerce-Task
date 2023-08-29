import db from "../../Database/config/config";
import express, { Express } from "express";
import catchAsync from "../../Errorservices/catchAsync";
import handlerFactory from "../../Errorservices/handlerFactory";

const User = db.users;

const getMe = catchAsync(async(req: Request, res: Response) => {
    const client = await User.findOne({
        where: {}
    })
})

const getAllUser = handlerFactory.getAll(User)
const gwtOneUser = handlerFactory.getOne(User)
const deleteUser = handlerFactory.deleteOne(User)