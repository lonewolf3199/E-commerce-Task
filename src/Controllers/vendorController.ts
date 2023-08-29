import db from "../Database/config/config";
import express ,{ Express } from "express";
import catchAsync from "../Errorservices/catchAsync";
import bcrypt from 'bcrypt';
import handlerFactory from "../Errorservices/handlerFactory";
import dotenv from 'dotenv';

dotenv.config({ path: './env' });

const vendor = db.vendors;
const Product = db.product;

const registerVendor = catchAsync(async(req: Request, res: Response) => {
    const usernameVendor = await vendor.findOne({
        where: {}
    });
})