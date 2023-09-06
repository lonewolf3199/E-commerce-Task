import express, { Express } from "express";
import userValidation from "../../Validations/userValidation";
import vendorController from "./vendorController";
import authController from "../Authentication/authController"; 
import authentication from "../../Middlewares/authentication";

const router = express.Router()

router
.get('/getProduct',
authentication.loggedIn, 
authentication.toVendor,
vendorController.getVendorProduct);

router
.get('/getVendors',
authentication.loggedIn, 
authentication.toAdmin, 
vendorController.allVendors)

router
.get('/:id',
authentication.loggedIn, 
authentication.toAdmin, 
vendorController.oneVendor)

router
.post('/login', 
userValidation.loginVendorValidation, 
authController.loginVendor)

router
.post('/registerVendor',
authentication.loggedIn, 
authentication.toAdmin, 
userValidation.registerVendorValidate, 
vendorController.registerVendor)

router
.patch('/:id',
authentication.loggedIn, 
authentication.toAdmin, 
userValidation.updateVendor, 
vendorController.vendorUpdate)

router
.delete('/:id',
authentication.loggedIn, 
authentication.toAdmin, 
vendorController.vendorDelete)

export default router