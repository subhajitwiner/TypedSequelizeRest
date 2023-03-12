import { UserModel } from "../models/user.model";
import { Sequelize } from "sequelize";
import { ProductModel } from '../models/product.model';

const con = new Sequelize("sequlize", "root", "", {
  host: "localhost",
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
