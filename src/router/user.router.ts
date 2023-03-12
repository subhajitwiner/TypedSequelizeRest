import express from 'express';
import {login, register} from '../controllers/user.controller'
export const UserRouter = (router: express.Router, prefix='') => {
    router.post(prefix+'/register',register);
    router.post(prefix+'/login', login);
};