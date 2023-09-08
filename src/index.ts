import express, { Express } from "express";
import  dotenv  from "dotenv";
import userRoute from './Modules/User/userRoutes';
import vendorRoute from './Modules/Vendor/vendorRoutes';
import productRoute from './Modules/Product/productRoute';
import cartRoute from './Modules/Cart/cartRoute';
import db from './config'

const app: Express = express();
dotenv.config({path: './config.env'})
const PORT = process.env.App_PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

    // db.sequelize.sync({ force: false }).then(() => {
    // console.log("db has been re sync")
    // });

    app.use('/api/users', userRoute);
    app.use('/api/vendors', vendorRoute);
    app.use('/api/products', productRoute);
    app.use('/api/carts', cartRoute);

    app.listen(PORT, () => {
        console.log(`Server Is Running On ${PORT}`);
    });