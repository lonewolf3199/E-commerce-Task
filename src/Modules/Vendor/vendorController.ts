import { vendor } from 'sharp';
import db from "../../config";
import express ,{ Express, Request, Response } from "express";
import catchAsync from "../../Errorservices/catchAsync";
import bcrypt from 'bcrypt';
import jwtToken  from 'jsonwebtoken';
import handlerFactory from "../../Errorservices/handlerFactory";
import dotenv from 'dotenv';
import { AsyncLocalStorage } from 'async_hooks';

dotenv.config({ path: './env' });

const Vendor = db.vendors;
const Product = db.product;

const registerVendor = catchAsync(async(req: Request, res: Response) => {    
    console.log(res.locals.vendorUser.username);
    
    const usernameVendor = await Vendor.findOne({        
        where: {username: res.locals.vendorUser.username}
    });
    if(usernameVendor){
        return res.status(400).json({
            status: 'fail',
            message:"Username already exist",
        });
    }
    const emailVendor = await Vendor.findOne({
        where:{email :res.locals.vendorUser.email},
    });
    if (emailVendor ){
        return  res.status(401).json({
            status: 'fail',
            message: "Email Already Exist"
        });
    }
    const hashPasswords = await bcrypt.hash(res.locals.vendorUser.password, 10)
    res.locals.vendorUser.password = hashPasswords;
    const vendor = await Vendor.create(res.locals.vendorUser)
    if(vendor){
        const id = vendor.id
        const token = jwtToken.sign({id}, process.env.JWT_CONFIDENTIAL as string, { expiresIn: process.env.JWT_EXPIRES_IN})
        return res.status(201).json({
                status: 'success',
                message: "Vendor Created",
                data: vendor, token
        });
    }
    return res.status(400).json({
        status: 'fail',
        message: 'Sorry! Not able to create vendor'
    })
});

const getVendorProduct = catchAsync(async(req: Request, res: Response) => {
    const vendorId = res.locals.vendorUser.id;
    const vendorProducts = await Product.findAll({
        where: {vendorId}
    });
    return res.status(200).json({
        status: 'success',
        message: 'Here are the list of vendors Product'
    });
});

const vendorUpdate = catchAsync(async(req: Request, res: Response) => {
    const vendorId = req.params.id;
    const vendor = await Vendor.findById(vendorId)
    if(!vendor){
        return res.status(400).json({
            status: 'fail',
            message: 'Vendor Not Found'
        });
    }
    const vendorUpdated = await vendor.update(res.locals.vendorUser, {
        where: { vendorId }
    });
    return res.status(200).json({
        status: 'success',
        message: 'Successfully Updated The Vendor'
    });
});

const allVendors = handlerFactory.getAll(vendor);
const oneVendor = handlerFactory.getOne(vendor);
const vendorDelete = handlerFactory.deleteOne(vendor);

export default {
    registerVendor,
    getVendorProduct,
    vendorUpdate,
    allVendors,
    oneVendor,
    vendorDelete
};