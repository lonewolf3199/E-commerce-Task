import express from "express";
import productController from "./productController";
import authentication from "../../Middlewares/authentication";
import productValidation from "../../Validations/productValidation";

const router = express.Router();

router
.post('/registerProduct',
authentication.loggedIn, 
authentication.toVendor, 
productValidation.productCreateValidation, 
productController.createProduct)

router
.get('/getAll',
authentication.loggedIn, 
productController.getProducts)

router
.get('/:id',
authentication.loggedIn, 
productController.oneProduct)

router
.patch('/:id',
authentication.loggedIn, 
authentication.toVendor, 
productValidation.updateProduct, 
productController.poroductUpdate)

router
.delete('/:id',
authentication.loggedIn, 
authentication.toVendor, 
productController.productDelete)

export default router