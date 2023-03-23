import { UserModel } from "../models/user.model";
import { Sequelize } from "sequelize";
import { ProductModel } from '../models/product.model';
import { StoreModel } from '../models/store.model';
import { CountryModel } from "../models/country.model";
import { StateModel } from "../models/state.model";
import { CityModel } from "../models/city.model";
import { DistrictModel } from "../models/district.model";
import {sequelize} from './sequlize';

export const db = {
  Sequelize: Sequelize,
  sequelize,
  Products: ProductModel.schema(sequelize),
  Users: UserModel.schema(sequelize),
  Stores: StoreModel.schema(sequelize),
  Countries: CountryModel.schema(sequelize),
  States: StateModel.schema(sequelize),
  Cities: CityModel.schema(sequelize),
  Districts: DistrictModel.schema(sequelize),
};

sequelize.sync({ force: false, alter: false })
  .then(() => {
    console.log('Resync done');
  })
  .catch((syncErr: any) => {
    console.log(syncErr);
  });