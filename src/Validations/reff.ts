// import db from '../../database/config/config';
// import jwtToken from 'jsonwebtoken';
// import express, { Request, Response, NextFunction } from 'express';
// import catchAsync from '../../service/catchAsync';
// import bcrypt from 'bcrypt';
// import dotenv from 'dotenv';
// dotenv.config({ path: './.env' });

// const User = db.users;
// const Vendor = db.vendors;

// const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const alreadyUser = await User.findOne({ where: { email: res.locals.user.email } });
//     if (alreadyUser) {
//         return res.status(400).json({ error: 'This email already taken. Please use login' });
//     }

//     const round: number = Number(process.env.BCRYPT_ROUND) || 12;
//     const hashPassword = await bcrypt.hash(res.locals.user.password, round);
//     res.locals.user.password = hashPassword;

//     const user = await User.create(res.locals.user);
//     if (user) {
//         const id = user.id;
//         const token = jwtToken.sign({ id }, process.env.JWT_SECRET_KEY as string, { expiresIn: process.env.JWT_EXPIRES_IN });
//         return res.status(201).json({ user, token, message: 'SignUp successful' });
//     }
//     return res.status(400).json({ error: 'Error creating user' });
// });

// const login = catchAsync(async (req: Request, res: Response) => {
//     const user = await User.findOne({ where: { email: res.locals.user.email } });
//     if (!user) {
//         return res.status(400).json({ error: 'Invalid email or password' });
//     }
//     if (user.status === 'inactive') {
//         return res.status(400).json({ error: 'Your account is inactive. Please contact admin' });
//     }
//     const isMatch = await bcrypt.compare(res.locals.user.password, user.password);
//     if (!isMatch) {
//         return res.status(400).json({ error: 'Invalid email or password' });
//     }
//     const id = user.id;
//     const token = jwtToken.sign({ id }, process.env.JWT_SECRET_KEY as string, { expiresIn: process.env.JWT_EXPIRES_IN });
//     return res.status(201).json({ user, token, message: 'SignIn successful' });
// });

// const vendorLogin = catchAsync(async (req: Request, res: Response) => {
//     if (!res.locals.vendor.email && !res.locals.vendor.username) {
//         return res.status(400).json({ error: 'Please enter email or username' });
//     }
//     const vendor = await Vendor.findOne({
//         where: {}
//     });
//     if (!vendor) {
//         return res.status(400).json({ error: 'Invalid email or password' });
//     }
//     if (vendor.status === 'inactive') {
//         return res.status(400).json({ error: 'Your account is inactive. Please contact admin' });
//     }
//     const isMatch = await bcrypt.compare(res.locals.vendor.password, vendor.password);
//     if (!isMatch) {
//         return res.status(400).json({ error: 'Invalid email or password' });
//     }
//     const email = vendor.email;
//     const token = jwtToken.sign({ email }, process.env.JWT_SECRET_KEY as string, { expiresIn: process.env.JWT_EXPIRES_IN });
//     return res.status(201).json({ vendor, token, message: 'SignIn successful' });
// });

// const logout = catchAsync(async (req: Request, res: Response) => {
//     // Assuming the token-based logout functionality here
//     const authHeader: any = req.headers["authorization"];
//     jwtToken.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
//         if (logout) {
//             return res.status(200).json({ message: 'Logout successful' });
//         } else {
//             return res.status(400).json({ error: 'Logout failed' });
//         }
//     });
// });

// export default {
//     signup,
//     login,
//     vendorLogin,
//     logout
// };
