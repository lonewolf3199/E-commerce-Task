import joi from "joi";
import express, { Express, Request, Response, NextFunction } from "express";

const validationErrorResponse = (res: Response, message: string) => {
    return res.status(400).json({ error: message });
};

const productCreateValidation = (req: Request, res: Response, next: NextFunction) => {
    const productSchema = joi.object({
        name: joi.string().required(),
        price: joi.number().required(),
        category: joi.string().required(),
        
    })
}