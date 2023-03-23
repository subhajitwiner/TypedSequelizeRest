import express from 'express';
import { TokenValidatorMiddlehare } from '../middlewhare/tokenvalidator';
import { create, remove, display, update } from '../controllers/product.controller';
export const ProductRouter =  (router: express.Router, prefix='') => {
  
  /* GET Products listing. */
  router.post(prefix+'/create', TokenValidatorMiddlehare.tokenValidate , create);
  router.get(prefix+'/display', display);
  router.put(prefix+'/update', update);
  router.delete(prefix+'/remove',TokenValidatorMiddlehare.tokenValidate, remove);
}