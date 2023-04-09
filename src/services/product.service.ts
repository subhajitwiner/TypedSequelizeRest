import { ProductDto, UpdateProductDto } from "../dtos/product.dto";
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
        data: { message: "Product created successfully", date: data },
        status: 201,
      };
    } catch (error) {
      return {
        data: { message: "cannot create product", err: error },
        status: 500,
      };
    }
  }
  async update(id: number, attrs: Partial<UpdateProductDto>) {
    try {
      const data = await this.product.update(attrs, {
        where: {
          id: id,
        },
      });
      return {
        data: { message: "Product updated successfully", date: data },
        status: 200,
      };
    } catch (error) {
      return {
        data: { message: "cannot update product", err: error },
        status: 500,
      };
    }
  }
  async display() {
    try {
      const data = await this.product.findAll();
      return {
        data: { message: "Product fetched successfully", date: data },
        status: 200,
      };
    } catch (error) {
      return {
        data: { message: "cannot display product", err: error },
        status: 500,
      };
    }
  }
  async delete(id: number) {
    try {
      const data = await this.product.destroy({
        where: {
          id: id,
        },
      });
      return {
        data: { message: "Product deleted successfully", date: data },
        status: 200,
      };
    } catch (error) {
      return {
        data: { message: "cannot delete product", err: error },
        status: 500,
      };
    }
  }
}
