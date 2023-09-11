import express, { Express, Request, Response, NextFunction, query } from "express";
import catchAsync from "./catchAsync";
import { Model } from "sequelize";

const getAll = ( Model: any) => catchAsync(async(req: Request, res: Response, next: NextFunction ) => {
    const document = await Model.findAll();
    return res.status(201).json({
        status: 'success',
        message: 'Data Fetched Successfully',
        data: document
    });
});

const getOne = (Model: any) =>  catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    let query = Model.findByPk(req.params.id)
    const document = await query
    if(!document){
        res.status(404).json({
            status: 'fail',
            message: 'No Data Found By The Provided Data'
        })
    }
    res.status(200).json({
        status: 'success',
        data: document
    });
});

const deleteOne = (Model: any) => catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const document = await Model.destroy({
        where: { id: req.params.id }
    })
    if(!document){
        res.status(404).json({
            status:'fail',
            message : `Document Not found`
        })
    }
    res.status(200).json({
        message:"Deleted",
    })
});

export default{
    getAll,
    getOne,
    deleteOne};