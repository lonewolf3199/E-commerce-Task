import db from "../../config";
import express, { Express, Request, Response, NextFunction } from "express";
import catchAsync from "../../Errorservices/catchAsync";

const Cart = db.carts;
const Product = db.products;

const addToCart = catchAsync(async( req: Request, res: Response, next: NextFunction) => {
    const productId = res.locals.itemCarts.productId;
    const quantity = res.locals.itemCarts.quantity;
    const userId = res.locals.user.id;
    const product = await Product.findOne({
        where: {id: productId}
    });
    if(!product){
        return res.status(404).json({
            status: 'fail',
            message: 'No Product Was Found By Provided Id'
        });
    }
    const thisCart = await Cart.findOne({
        where: {productId}
    })
    if(thisCart){
        thisCart.quantity = thisCart.quantity + quantity;
        await thisCart.save();
        return res.status(200).json({
            status: 'success',
            message: 'Product Added To Cart Successfully'
        });
    }
    const latestCart = await Cart.create({
        userId, productId, quantity
    })
    return res.status(201).json({
        status: 'success',
        message: 'Cart Has Been Created Successfully',
        data: latestCart
    })
});

export default {
    addToCart
}