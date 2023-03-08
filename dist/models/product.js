"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    const Product = sequelize.define("Product", {
        name: {
            type: sequelize_1.DataTypes,
            allowNull: false,
        },
        image: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        category: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: true,
        }
    });
    return Product;
};
//# sourceMappingURL=product.js.map