import express from "express";
import productController from "./productController";
import authentication from "../../Middlewares/authentication";
import productValidation from "../../Validations/productValidation";

const router = express.Router();

router
.post('/registerProduct', authentication.toVendor, productValidation.productCreateValidation, productController.createProduct)

router
.get('/getAll', productController.getProducts)

router
.get('/:id', productController.oneProduct)

router
.patch('/:id', authentication.toVendor, productValidation.updateProduct, productController.poroductUpdate)

router
.delete('/:id', authentication.toVendor, productController.productDelete)

export default router