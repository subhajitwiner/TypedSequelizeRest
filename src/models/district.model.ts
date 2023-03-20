import { DataTypes, Sequelize } from "sequelize";
import {} from '../models/state.model';
import { CityModel } from "../models/city.model";

export class DistrictModel{
    static schema = (sequelize: Sequelize) => {
        const district = sequelize.define('district', {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            countryId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        })
        district.belongsTo(CityModel.schema(sequelize));
        return district;
    }
}