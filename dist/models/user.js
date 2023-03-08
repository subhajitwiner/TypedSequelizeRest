"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        fname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        lname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: true
        },
        accountType: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        }
    });
    return User;
};
//# sourceMappingURL=user.js.map