import express from "express";
import { CategoryDto, UpdateCategoryDto } from "../dtos/category.dto";
import { plainToClass } from "class-transformer";
import { isNumber } from "class-validator";
import { DtoValidatorMiddlehare } from "../middlewhare/dtovalidator";
import { CategoryService } from "../services/category.service";
export class CategoryController {
  categoryService: CategoryService = new CategoryService();
  create = async (req: express.Request, res: express.Response) => {
    let categoryData = plainToClass(CategoryDto, req.params.category);
    const isNotValid = await DtoValidatorMiddlehare.dtoValidate(categoryData);
    if (isNotValid.length > 0) {
      res.status(412).json(isNotValid);
    } else {
      let result = await this.categoryService.create(categoryData);
      res.status(result.status).json(result.data);
    }
  };
  displayAll = async (req: express.Request, res: express.Response) => {
    let result = await this.categoryService.display();
    res.status(result.status).json({data:result.data, token:req.body.token});
  };
  displayOne = async (req: express.Request, res: express.Response) => {
    let cid = req.params.id;
    if (!cid || isNumber(cid)) {
      return res.status(400).json({ message: "invalid category id" });
    }
    let result = await this.categoryService.displayOne(Number(cid));
    res.status(result.status).json({data:result.data, token:req.body.token});
  };
  update = async (req: express.Request, res: express.Response) => {
    let cid = req.params.id;
    if (!cid || isNumber(cid)) {
      return res.status(400).json({ message: "invalid category id" });
    }
    let categoryData = plainToClass(UpdateCategoryDto, req.body);
    const isNotValidProduct = await DtoValidatorMiddlehare.dtoValidate(
      categoryData
    );
    if (isNotValidProduct.length > 0) {
      res.status(412).json(isNotValidProduct);
    } else {
      let result = await this.categoryService.update(Number(cid), categoryData);
      res.status(result.status).json(result.data);
    }
  };
  delete = async (req: express.Request, res: express.Response) => {
    let cid = req.params.id;
    if (!cid || isNumber(cid)) {
      return res.status(400).json({ message: "invalid category id" });
    }
    let result = await this.categoryService.delete(Number(cid));
    res
      .status(result.status)
      .json({ data: result.data, token: req.body.token });
  };
}
