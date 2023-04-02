import express from "express";
import { db } from "../database/connection";
import * as dotenv from "dotenv";
import { plainToClass } from "class-transformer";
import { IsNumber, isNumber } from "class-validator";
import { DtoValidatorMiddlehare } from "../middlewhare/dtovalidator";
import { ProductDto, UpdateProductDto } from "../dtos/product.dto";
import { ProductService } from "../services/product.service";
dotenv.config();
const product = db.Products;
export class ProductController {
  productService: ProductService = new ProductService();
  create = async (req: express.Request, res: express.Response) => {
    let productData = plainToClass(ProductDto, req.body);
    const isNotValidProduct = await DtoValidatorMiddlehare.dtoValidate(
      productData
    );
    if (isNotValidProduct.length > 0) {
      res.status(412).json(isNotValidProduct);
    } else {
      let result = await this.productService.create(productData);
      res.status(result.status).json(result.data);
    }
  };
  remove = async (req: express.Request, res: express.Response) => {
    const data = await product.destroy({
      where: {
        id: req.body.id,
      },
    });
    return res.json({
      data: data,
      token: req.body.token,
      message: "data deleted successfully",
    });
  };
  display = async (req: express.Request, res: express.Response) => {
    const data = await product.findAll();
    res.send(data);
  };
  update = async (req: express.Request, res: express.Response) => {
    let pid = req.params.id;
    if (!pid || isNumber(pid)) {
      return res.status(400).json({ message: "invalid product id" });
    }
    let productData = plainToClass(UpdateProductDto, req.body);
    const isNotValidProduct = await DtoValidatorMiddlehare.dtoValidate(
      productData
    );
    if (isNotValidProduct.length > 0) {
      res.status(412).json(isNotValidProduct);
    } else {
      let result = await this.productService.update(Number(pid), productData);
      res.status(result.status).json(result.data);
    }
  };
}
