import { CategoryDto, UpdateCategoryDto } from "dtos/category.dto";
import { db } from "../database/connection";
export class CategoryService {
  category = db.categories;
  async display() {
    try {
      const data = await this.category.findAll();
      return {
        data: { message: "Category fetched successfully", date: data },
        status: 200,
      };
    } catch (error) {
      return {
        data: { message: "cannot display category", err: error },
        status: 500,
      }
    }
  }
  async displayOne(id: number){
    try {
      const data = await this.category.findOne();
      return {
        data: { message: "Category fetched successfully", date: data },
        status: 200,
      };
    } catch (error) {
      return {
        data: { message: "cannot display category", err: error },
        status: 500,
      }
    }
  }
  async create(categoryData: CategoryDto) {
    try {
      const data = await this.category.create({
        categoryName: categoryData.categoryName,
        categoryDescription: categoryData.categoryDescription,
      });
      return {
        data: { message: "Category created successfully", date: data },
        status: 201,
      };
    } catch (error) {
      return {
        data: { message: "cannot create category", err: error },
        status: 500,
      };
    }
  }
  async update(id: number, attrs: Partial<UpdateCategoryDto>) {
    try {
      const data = await this.category.update(attrs, {
        where: {
          id: id,
        },
      });
      return {
        data: { message: "Category updated successfully", date: data },
        status: 200,
      };
    } catch (error) {
      return {
        data: { message: "cannot update category", err: error },
        status: 500,
      };
    }
  }
  async delete(id: number) {
    try {
      const data = await this.category.destroy({
        where: {
          id: id,
        },
      });
      return {
        data: { message: "Category deleted successfully", date: data },
        status: 200,
      };
    } catch (error) {
      return {
        data: { message: "Category delete product", err: error },
        status: 500,
      }
    }
  }
}
