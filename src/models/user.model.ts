import { DataTypes, Sequelize } from "sequelize";

export class UserModel{
    static schema = (sequelize: Sequelize) => {
        const user = sequelize.define('user', {
            fname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            phone:{
                type: DataTypes.DECIMAL,
                allowNull:true
            },
            role: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            accountType: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull:false,
            }
        })
        return user;
    }
}