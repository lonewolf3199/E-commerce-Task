import express ,{ Express, Request, Response, NextFunction } from "express";
import db from "../config";
import catchAsync from "../Errorservices/catchAsync";

const User = db.users;

const toAdmin = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    if(!res.locals.user){
        return  res.status(401).json({
            status: 'fail',
            message:"Not Authorized"
        })
    }
    if(res.locals.user.role !== 'admin'){
        return res.status(400).json({
            status: 'fail',
            message: 'You are Not Authorised to Access This Route'
        });
    };
    next();    
});

const toVendor = (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.vendor || !res.locals.vendor._id ){
        return res.status(401).json({
            status: 'fail',
            message:'You Are Not Authorised To Access Vendor Route'
        })
    };
};

export default{ 
    toAdmin,
    toVendor
}