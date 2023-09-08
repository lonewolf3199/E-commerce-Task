import express, { Express } from "express";
import productValidation from "../../Validations/productValidation";
import authentication from "../../Middlewares/authentication";
import cartController from "./cartController";

const router = express.Router();

router
.post('/addtocart', 
authentication.loggedIn, 
productValidation.addOnCart, 
cartController.addToCart)

export default router
