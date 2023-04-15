import express from "express";
import { db } from "../database/connection";
import * as dotenv from "dotenv";
import { plainToClass } from "class-transformer";
import { isNumber } from "class-validator";
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
      res.status(result.status).json({data:result.data, token:req.body.token});
    }
  };
  remove = async (req: express.Request, res: express.Response) => {
    let pid = req.params.id;
    if (!pid || isNumber(pid)) {
      return res.status(400).json({ message: "invalid product id" });
    }
    let result = await this.productService.delete(Number(pid));
    res.status(result.status).json({data:result.data, token:req.body.token});
  };
  display = async (req: express.Request, res: express.Response) => {
    let result = await this.productService.display();
    res.status(result.status).json({data:result.data, token:req.body.token});
  };
  displayOne = async (req: express.Request, res: express.Response) => {
    let pid = req.params.id;
    if (!pid || isNumber(pid)) {
      return res.status(400).json({ message: "invalid product id" });
    }
    let result = await this.productService.displayOne(Number(pid));
    res.status(result.status).json({data:result.data, token:req.body.token});
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
      res.status(result.status).json({data:result.data, token:req.body.token});
    }
  };
}
