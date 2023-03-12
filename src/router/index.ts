import express from 'express';
import { ProductRouter } from './product.router';
import { UserRouter } from './user.router';

export class IndexRouter {
  router = express.Router(); 
  route(){
    UserRouter(this.router,'/users');
    ProductRouter(this.router,'/product');
    return this.router;
  }
}