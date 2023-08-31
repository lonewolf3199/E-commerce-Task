import db from "../../config";
import express, { Express, Request, Response } from "express";
import catchAsync from "../../Errorservices/catchAsync";
import handlerFactory from "../../Errorservices/handlerFactory";

const User = db.users;

const getMe = catchAsync(async(req: Request, res: Response) => {
    const client = await User.findOne({
        where: { id: res.locals.id }
    });
    return res.status(200).json({
        status: 'success',
        data: client
    })
});

const updateCurrentUser = catchAsync(async(req: Request, res: Response) => {
    const clientUpdate = await User.update(res.locals.userUpadte, {
        where: {id: res.locals.user.id}
    });
    const document = await User.findOne({
        where: {id: res.locals.user.id}
    });
    return res.status(200).json({
        status: 'success',
        message: 'User Updated Successfully'
    })
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateDoc = await User.update(res.locals.updateUser, {
        where: { id }
    });
    const document = await User.findOne({ where: { id } })
    if (!document) {
        return res.status(400).json({
            status: 'fail',
            message: 'No User Found By Provided ID'
        });
    }
    return res.status(200).json({
        status: 'success',
        data: document
    });

});
const getAllUser = handlerFactory.getAll(User)
const getOneUser = handlerFactory.getOne(User)
const deleteUser = handlerFactory.deleteOne(User)

export default {
    getAllUser,
    getOneUser,
    getMe,
    updateCurrentUser,
    updateUser,
    deleteUser,
}