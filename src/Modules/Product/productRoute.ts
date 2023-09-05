import express from "express";
import productController from "./productController";
import authentication from "../../Middlewares/authentication";
import productValidation from "../../Validations/productValidation";

const router = express.Router();



export default router