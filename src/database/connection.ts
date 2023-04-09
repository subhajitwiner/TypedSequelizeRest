import { UserModel } from "../models/user.model";
import { Sequelize, Error } from "sequelize";
import { ProductModel } from '../models/product.model';
import { StoreModel } from '../models/store.model';
import { CountryModel } from "../models/country.model";
import { StateModel } from "../models/state.model";
import { CityModel } from "../models/city.model";
import { DistrictModel } from "../models/district.model";
import { SequlizeConfig } from './sequlize';
import { QuestionModel } from "../models/question.model";
import { CategoryModel } from '../models/category.model';
let sequlizeConfig = new SequlizeConfig(process.env.DB_DBTYPE);
export const db = {
  Sequelize: Sequelize,
  sequelize: sequlizeConfig.sequelize,
  Products: ProductModel.schema(sequlizeConfig.sequelize),
  Users: UserModel.schema(sequlizeConfig.sequelize),
  Stores: StoreModel.schema(sequlizeConfig.sequelize),
  Countries: CountryModel.schema(sequlizeConfig.sequelize),
  States: StateModel.schema(sequlizeConfig.sequelize),
  Cities: CityModel.schema(sequlizeConfig.sequelize),
  Districts: DistrictModel.schema(sequlizeConfig.sequelize),
  Questions: QuestionModel.schema(sequlizeConfig.sequelize),
  categories: CategoryModel.schema(sequlizeConfig.sequelize)
};

function dbSync(execSync: Boolean){
   if(execSync){
      sequlizeConfig.sequelize.sync({ force: false, alter: false })
        .then(() => {
           console.log('Resync done');
        })
        .catch((syncErr: Error) => {
           console.log(syncErr);
        });
   }
   else{
      console.log('Database sync is offline')
   }
}
dbSync(true);