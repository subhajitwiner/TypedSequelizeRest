import { DataTypes, Sequelize } from "sequelize";
import {CountryModel} from '../models/country.model'
export class StateModel{
    static schema = (sequelize: Sequelize) => {
        const state = sequelize.define('state', {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            countryId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        })
        state.belongsTo(CountryModel.schema(sequelize))
        return state;
    }
}