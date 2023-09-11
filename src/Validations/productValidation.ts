import joi from "joi";
import express, { Express, Request, Response, NextFunction } from "express";

const validationErrorResponse = (res: Response, message: string) => {
    return res.status(400).json({ error: message });
};

const productCreateValidation = (req: Request, res: Response, next: NextFunction) => {
    const productSchema = joi.object({
        name_product: joi.string().required(),
        price: joi.number().required(),
        category: joi.string().required(),
        description: joi.string().default( '' ),
        stock: joi.number().default(0),
        status: joi.string().valid('active', 'inactive').default('active')
    });
    const { error, value} = productSchema.validate(req.body);
    if(error){
        return validationErrorResponse(res, error.details[0].message)
    };
    res.locals.product = value;
    next()
};

const updateProduct = (req: Request, res: Response, next: NextFunction) => {
    const updateSchema = joi.object({
        name: joi.string(),
        price: joi.number(),
        category: joi.string(),
        description: joi.string(),
        stock: joi.number(),
        status: joi.string().valid('active', 'inactive')
    });
    const { error, value} = updateSchema.validate(req.body)
    if(error){
        return validationErrorResponse(res, error.details[0].message)
    };
    res.locals.product = value;
    next();
};

const addOnCart = (req: Request, res: Response, next : NextFunction) => {
    const cartQuantity = joi.object({
        productId: joi.number().required(),
        quantity: joi.number().required()
    });
    const { error, value } = cartQuantity.validate(req.body)
    if(error){
        return validationErrorResponse(res, error.details[0].message)
    };
    res.locals.cart = value
    next();
};

export default {
    productCreateValidation,
    updateProduct,
    addOnCart
}