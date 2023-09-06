import { Sequelize, DataTypes } from "sequelize";
import  dotenv  from "dotenv";

dotenv.config({path: './config.env'})

const nameDb = process.env.DB_NAME as string
const userDb = process.env.DB_USER as string
const passDb = process.env.DB_PASS
const hostDb = process.env.DB_HOST
const portDb = process.env.DB_PORT

const sequelize = new Sequelize(`postgres://${userDb}:${passDb}@${hostDb}:${portDb}/${nameDb}`, {dialect: "postgres"})

sequelize.authenticate()
.then(() => {
    console.log("Connection Has Been Established Successfully");  
}).catch((err) => {
    console.log('Unable to connect to the database:', err);
})

const db: any = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./../src/Modules/User/userModel')(sequelize,DataTypes);
db.vendors = require('./../src/Modules/Vendor/vendorModel')(sequelize,DataTypes);
db.products = require('./Modules/Product/productModel')(sequelize, DataTypes);

export default db

