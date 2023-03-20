import { UserModel } from "../models/user.model";
import { Sequelize } from "sequelize";
import { ProductModel } from '../models/product.model';
import { StoreModel } from '../models/store.model';
import * as dotenv from 'dotenv';
import { CountryModel } from "../models/country.model";
import { StateModel } from "../models/state.model";
import { CityModel } from "../models/city.model";
import { DistrictModel } from "../models/district.model";

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
    Users: UserModel.schema(con),
    Stores: StoreModel.schema(con),
    Countries: CountryModel.schema(con),
    States: StateModel.schema(con),
    cities: CityModel.schema(con),
    districts: DistrictModel.schema(con)
};
db.con.sync({ force: false, alter: false }).then(() => {
    console.log("resync done");
}).catch( (syncerr: any)  => {
    console.log(syncerr);
});
