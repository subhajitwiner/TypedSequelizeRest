import express from 'express';
import {UserController} from '../controllers/user.controller'
export const UserRouter = (router: express.Router, prefix='') => {
    let user = new UserController();
    router.post(prefix+'/register',user.register);
    router.post(prefix+'/login', user.login);
};