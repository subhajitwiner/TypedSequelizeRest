import { UserModel } from "../models/user.model";
import { Sequelize, Error } from "sequelize";
import { ProductModel } from '../models/product.model';
import { StoreModel } from '../models/store.model';
import { CountryModel } from "../models/country.model";
import { StateModel } from "../models/state.model";
import { CityModel } from "../models/city.model";
import { DistrictModel } from "../models/district.model";
import {sequelize} from './sequlize';
import { QuestionModel } from "../models/question.model";
import { CategoryModel } from '../models/category.model';

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
  Questions: QuestionModel.schema(sequelize),
  categories: CategoryModel.schema(sequelize)
};

sequelize.sync({ force: false, alter: false })
  .then(() => {
     console.log('Resync done');
  })
  .catch((syncErr: Error) => {
     console.log(syncErr);
  });