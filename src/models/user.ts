import { Sequelize, DataTypes} from 'sequelize';
module.exports = (sequelize: Sequelize)=>{
    const User = sequelize.define('User', {
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
        accountType: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull:true,
        }
    });
    return User;
};