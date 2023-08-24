import express, { Express } from "express";
import  dotenv  from "dotenv";
import db from './Database/config/config'

const app: Express = express();
dotenv.config({path: './config.env'})
const PORT = process.env.App_PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

    // db.sequelize.sync({ force: false }).then(() => {
    // console.log("db has been re sync")
    // });

    app.listen(PORT, () => {
        console.log(`Server Is Running On ${PORT}`);
    })