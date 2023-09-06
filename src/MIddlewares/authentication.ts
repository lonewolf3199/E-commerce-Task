import express ,{ Express, Request, Response, NextFunction } from "express";
import db from "../config";
import jwt_decode from 'jwt-decode'
import catchAsync from "../Errorservices/catchAsync";

const User = db.users;
const Vendor = db.vendors

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

const loggedIn = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization?.replace('Bearer', '')?.replace('Bearer', '').trim()
    if(token){
        const decoded: any = jwt_decode(token);
        if(decoded.email){
            const vendorLoggedIn = await Vendor.findOne({
                where: {email: decoded.email}
            });
            if(!vendorLoggedIn){
                return res.status(401).json({
                    status: 'fail',
                    message: 'Only Vendor Are Authorised To access this Route'
                })
            }
            res.locals.vendor = vendorLoggedIn
            return next();
        }
    }
})

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
    loggedIn,
    toVendor
}