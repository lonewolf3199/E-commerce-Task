import express from "express";
import authController from "../Authentication/authController";
import userController from "./userController";
import authentication from "../../Middlewares/authentication";
import userValidation from "../../Validations/userValidation";

const router = express.Router();

router
.post('/signup', 
userValidation.registerValidate, 
authController.register)

router
.post('/login', 
userValidation.loginValidate, 
authController.login)

router
.get('/getall',
authentication.loggedIn, 
authentication.toAdmin,
userController.getAllUser);

router
.get('/user',
authentication.loggedIn, 
userController.getMe);

router
.get('/:id',
authentication.loggedIn, 
authentication.toAdmin, 
userController.getOneUser)

router
.patch('/userUpdate',
authentication.loggedIn, 
userValidation.updateUser, 
userController.updateCurrentUser)

router
.patch('/:id',
authentication.loggedIn, 
userValidation.updateUser, 
userController.updateUser)

router
.delete('/:id',
authentication.loggedIn, 
authentication.toAdmin, 
userController.deleteUser)

export default router;