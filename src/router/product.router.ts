import express from 'express';
import { TokenValidatorMiddlehare } from '../middlewhare/tokenvalidator';
import { ProductController } from '../controllers/product.controller';
export const ProductRouter =  (router: express.Router, prefix='') => {
  const product = new ProductController();
  
  /* GET Products listing. */
  router.post(prefix+'/create', TokenValidatorMiddlehare.tokenValidate , product.create);
  router.get(prefix+'/display', product.display);
  router.put(prefix+'/update', product.update);
  router.delete(prefix+'/remove',TokenValidatorMiddlehare.tokenValidate, product.remove);
}