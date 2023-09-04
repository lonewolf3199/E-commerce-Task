import express, { Express } from "express";
import userValidation from "../../Validations/userValidation";
import vendorController from "./vendorController";
import authController from "../Authentication/authController"; 
import authentication from "../../Middlewares/authentication";

const router = express.Router()

router
.get('/getProduct', authentication.toVendor,vendorController.getVendorProduct);

router
.get('/getVendors', authentication.toAdmin, vendorController.allVendors)

router
.get('/:id', authentication.toAdmin, vendorController.oneVendor)

router
.post('/login', userValidation.loginVendorValidation, authController.loginVendor)

router
.post('/registerVendor', userValidation.registerVendorValidate, vendorController.registerVendor)

router
.patch('/:id', authentication.toAdmin, userValidation.updateVendor, vendorController.vendorUpdate)

router
.delete('/:id', authentication.toAdmin, vendorController.vendorDelete)

export default router