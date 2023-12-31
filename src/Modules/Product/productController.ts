import express, { Express, Request, Response, NextFunction } from "express";
import db from "../../config";
import catchAsync from "../../Errorservices/catchAsync";
import handlerFactory from "../../Errorservices/handlerFactory";
import multer from "multer";
import sharp from "sharp";

const Product = db.products;

const createProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.locals.product.vendorId = res.locals.vendor.id
    const product = await Product.create(res.locals.product)
    if(product){
        return res.status(201).json({
            status: 'success',
            message: 'Product Got Created Successfully'
        });
    };
    return res.status(400).json({
        status: 'fail',
        message: 'There Was A problem Creating The Product'
    });
});

const getProducts = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const document = await Product.findAll({
        where: {status: 'active'}
    });
    return res.status(201).json({
        status: 'success',
        message: 'Products Fetched SuccessFully',
        data: document
    });
});

const oneProduct = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    const document = await Product.findOne({
        where: [{id: productId} , {status: 'active'}]
    });
    if(!document){
        return res.status(404).json({
            status: 'fail',
            message: 'There Is No Product By Provided Id'
        });
    };
    return res.status(200).json({
        status: 'success',
        message: 'Products Fetched Successfully',
        data: document
    });
});

const productUpdate = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const update = await Product.update(res.locals.product, {
        where: {id: req.params.id}
    });
    if(!update){
        return res.status(400).json({
            status: 'fail',
            message: 'Not Able To Update The Product At This Moment'
        });
    };
    const document = await Product.findOne({where: {id: req.params.id}})
    if(!document){
        return res.status(400).json({
            status: 'fail',
            message: 'No Document Found By Provided Id'
        })
    }
    return res.status(200).json({
        status: 'success',
        message: 'Product Updated Successfully',
        data: document
    });
});

const productDelete = handlerFactory.deleteOne(Product)

export default {
    createProduct,
    getProducts,
    oneProduct,
    productUpdate,
    productDelete
}