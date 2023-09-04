import joi from "joi";
import express, { Request, Response, NextFunction } from "express";

const validationErrorResponse = (res: Response, message: string) => {
    return res.status(400).json({ error: message });
}

const registerValidate = async (req: Request, res: Response, next: NextFunction) => {
    const dataSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(32).required(),
        confirmPassword: joi.valid(joi.ref('password')).required(),
        role: joi.string().valid('admin', 'user').default('user'),
        status: joi.string().valid('active', 'inactive').default('active')
    });

    const { error, value } = dataSchema.validate(req.body);
    if (error) {
        return validationErrorResponse(res, error.details[0].message);
    }
    
    res.locals.user = value;
    next();
};

const loginValidate = async(req: Request, res: Response, next: NextFunction) => {
    const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
        return validationErrorResponse(res, error.details[0].message);
    }
    res.locals.user = value
    next();
};

const registerVendorValidate = async(req: Request, res: Response, next: NextFunction) => {
    const vendorRegisterData = joi.object({
        username: joi.string().required(),
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(32).required(),
        confirmPassword: joi.valid(joi.ref('password')).required(),
        status: joi.string().valid('active', 'inactive').default('active')
    });
    const { error, value } = vendorRegisterData.validate(req.body);
    if (error) {
        return validationErrorResponse(res, error.details[0].message);
    }
    res.locals.vendorUser = value;
    next();
};

const loginVendorValidation = async(req: Request, res: Response, next: NextFunction) => {
    const vendorLoginData = joi.object({
        username:joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    const { error, value } = vendorLoginData.validate(req.body);
    if (error) {
        return validationErrorResponse(res, error.details[0].message);
    }
    res.locals.vendorUser = value;
    next()
};

const updateVendor = async (req:Request, res: Response, next: NextFunction) => {
    const updateVendorData = joi.object({
        username: joi.string(),
        email: joi.string().email(),
        status: joi.string().valid('Active', 'Inactive')
    });
    const { error, value } = updateVendorData.validate(req.body);
    if(error){
        return  validationErrorResponse(res , error.details[0].message);
    }
    res.locals.vendor = value
    next();
    }

const updateUser =async (req:Request, res: Response, next: NextFunction) => {
    const updateUserData = joi.object({
        name: joi.string(),
        email:joi.string().email(),
        status : joi.string().valid("Active", "In Active")
    });
    const { error, value } = updateUserData.validate(req.body)
    if(error){
        return   validationErrorResponse(res , error.details[0].message );
    }
    res.locals.update = value
    next()
}

export default {
    registerValidate,
    loginValidate,
    registerVendorValidate,
    loginVendorValidation,
    updateVendor,
    updateUser
}
