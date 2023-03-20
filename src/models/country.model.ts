import { DataTypes, Sequelize } from "sequelize";
import { StateModel } from "../models/state.model";

export class CountryModel{
    static schema = (sequelize: Sequelize) => {
        const country = sequelize.define('country', {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            code: {
                type: DataTypes.DECIMAL(3,0),
                allowNull: false
            },
        })
        return country;
    }
}