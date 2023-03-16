import express from 'express';
import {db } from '../database/connection';
import * as dotenv from 'dotenv';
import { plainToClass } from 'class-transformer';
import { DtoValidatorMiddlehare } from '../middlewhare/dtovalidator';
dotenv.config(); 
const product = db.Products;
export const create = async (req: express.Request, res: express.Response) => {
    try {
      const data = await product.create(
        {
          name: req.body.name,
          image: req.body.image,
          category: req.body.category,
          price: req.body.price,
        }
      );
      return res.json({data:data, token:req.body.token, message:'data submited successfully'}).status(200);
  } catch (error) {
    return res.json(error)
  }
};
export const remove = async (req: express.Request, res: express.Response)=>{
  const data = await product.destroy({
    where: {
      id: req.body.id
    }
  });
  return res.json({data:data, token:req.body.token, message:'data deleted successfully'});
}
export const display = async (req: express.Request, res: express.Response) => {
  const data = await product.findAll();
  res.send(data);
}
export const update = async (req: express.Request, res: express.Response) => {
  const data = await product.update({name: req.body.name},{
    where:{
      id: req.body.id
    }
  })
  return res.send(data)
}