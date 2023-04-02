import { DataTypes, Sequelize } from "sequelize";
import { StateModel } from "../models/state.model";

export class CityModel{
    static schema = (sequelize: Sequelize) => {
        const city = sequelize.define('country', {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            code: {
                type: DataTypes.DECIMAL(3,0),
                allowNull: false
            },
        })
        city.belongsTo(StateModel.schema(sequelize));
        return city;
    }
}