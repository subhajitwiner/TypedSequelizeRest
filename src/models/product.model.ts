import { Sequelize, DataTypes} from 'sequelize';
export class ProductModel {
  static schema = (sequelize:Sequelize) =>{
    const product = sequelize.define('Product', {
      name : {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      }
    })
    return product;
  }
}
