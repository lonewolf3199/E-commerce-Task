import jwtToken  from 'jsonwebtoken';
import catchAsync from '../../Errorservices/catchAsync';
import express, { Express, Request, Response, NextFunction, response } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../../config';

dotenv.config({ path: './config.env' })

const User = db.users;
const Vendor = db.vendors;

const register = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userAvailabe = await User.findOne({where: {email: res.locals.user.email}});
    if(userAvailabe){
        return new Error('User already exist');
    }
    const hashPasswords = await bcrypt.hash(res.locals.user.password, 10)
    res.locals.user.password  = hashPasswords

    const user = await User.create(res.locals.user)
    if(user){
        const id = user.id
        const token = jwtToken.sign({ id }, process.env.JWT_CONFIDENTIAL as string, {expiresIn: process.env.JWT_EXPIRES_IN})
        return res.status(201).json({
            status: 'success',
            message:'Account Created successfully',
            data: user, token
        })
    }
    return res.status(400).json({
        status: 'fail',
        message:'Error',
    })
});

const login = catchAsync(async( req: Request, res: Response, next: NextFunction) =>{
    const user = await User.findOne({where: {email: res.locals.email}})
    if(!user){
        return new Error('Inalid Email or Password')
    }
    if(user.status == 'inactive'){
        return new Error("Your account is not active")
    }
    const isValid = await bcrypt.compare(res.locals.user.password, user.password)
    if(!isValid){
        return new Error('Invalid Password')
    }
    const id = user.id;
    const token = jwtToken.sign({id}, process.env.JWT_CONFIDENTIAL as string, {expiresIn: process.env.JWT_EXPIRES_IN})
    return res.status(201).json({
        status: 'success',
        message: 'LoggedIn Successful',
        data: user, token
    });
});

const loginVendor = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    if(!res.locals.vendor.email && !res.locals.vendor.username){
        return new Error('Please Enter Valid Username or Email')
    };
    const vendor = await Vendor.findOne({
        where: {}
    });
    if(!vendor){
        
    }
});


export default 
{register,
login,
loginVendor}