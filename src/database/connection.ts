import { UserModel } from "../models/user.model";
import { Sequelize } from "sequelize";
import { ProductModel } from '../models/product.model';
import * as dotenv from 'dotenv';

dotenv.config(); 
const con = new Sequelize(process.env.DB_DATABASE,process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});
con.authenticate().then(() => {
    console.log("connected");
  }).catch((err) => {
    console.log(err);
  });
export const db = {
    Sequelize,
    con,
    Products: ProductModel.schema(con),
    Users: UserModel.schema(con)
};
db.con.sync({ force: false, alter: true }).then(() => {
    console.log("resync done");
}).catch( (syncerr: any)  => {
    console.log(syncerr);
});
