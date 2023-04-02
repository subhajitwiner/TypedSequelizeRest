import { ProductDto } from "../dtos/product.dto";
import { db } from "../database/connection";
export class ProductService {
  product = db.Products;
  async create(productData: ProductDto) {
    try {
      const data = await this.product.create({
        name: productData.name,
        image: productData.image,
        category: productData.category,
        price: productData.price,
      });
      return {
        data:{ message: "Product created successfully", date:data},
        status: 201,
      }
    } 
    catch (error) {
      return {
        data: { message: "cannot create product", err: error },
        status: 500,
      };
    }
  }
}