import { DataTypes, Sequelize } from "sequelize";

export class StoreModel{
    static schema = (sequelize: Sequelize) => {
        const store = sequelize.define('store', {
            storeName: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            category: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            licenceNumber: {
                type: DataTypes.STRING(50),
                unique: true,
                allowNull: true
            },
            country:{
                type: DataTypes.INTEGER,
                allowNull: true
            },
            state: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            district:{
                type: DataTypes.INTEGER,
                allowNull: true
            },
            pin:{
                type: DataTypes.DECIMAL(6,0),
                allowNull: true
            }
        })
        return store;
    }
}