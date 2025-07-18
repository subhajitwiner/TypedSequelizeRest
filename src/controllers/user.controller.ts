import express from "express";
import * as bcrypt from "bcrypt";
import * as dotenv from 'dotenv';
import { plainToClass } from "class-transformer";
import { userDto, UserLoginDto } from "../dtos/user.dto";
import { DtoValidatorMiddlehare } from "../middlewhare/dtovalidator";
import { UserService } from '../services/user.service';

dotenv.config();
const saltRounds = 13;
const userService = new UserService();
export class UserController{
  register = async (req: express.Request, res: express.Response) => {
    let userData = plainToClass(userDto, req.body)
    let isNotValidUser = await DtoValidatorMiddlehare.dtoValidate(userData)
    if (isNotValidUser.length > 0) {
      res.status(412).json(isNotValidUser);
    } else {
      bcrypt.hash(userData.password, saltRounds, async (err, hash) => {
        if (err) {
          return res.status(500).json({ error: err });
        } 
        else {
          let result = await userService.createUser(userData,hash);
          return res.status(result.status).json(result.data);
        }
      });
    }
  };
  login = async (req: express.Request, res: express.Response) => {
    let userlogindata = plainToClass(UserLoginDto, req.body)
    let isNotValidUserLoginData = await DtoValidatorMiddlehare.dtoValidate(userlogindata);
    if (isNotValidUserLoginData.length > 0) {
      res.status(412).json(isNotValidUserLoginData);
    }
    else {
      let loginData = await userService.loginUser(userlogindata);
      return res.status(loginData.status).json(loginData.data)
    }
  };
}
