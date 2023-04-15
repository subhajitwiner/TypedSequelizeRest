import { Sequelize,DataTypes } from "sequelize";

export class CategoryModel{
    static schema = (sequelize: Sequelize) => {
        const category = sequelize.define('category', {
            categoryName : {
                type: DataTypes.STRING,
                allowNull: false,
            },
            categoryDescription : {
                type: DataTypes.TEXT,
                allowNull: false,
            }
        });
        return category;
    }
}