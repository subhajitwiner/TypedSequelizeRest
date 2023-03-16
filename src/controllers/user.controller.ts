import express from "express";
import { db } from "../database/connection";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { AccountTypeEnum } from '../enums/accountType.enum';
import { rolesEnum } from '../enums/roles.enum';
import * as dotenv from 'dotenv';
import { plainToClass } from "class-transformer";
import { userDto, UserLoginDto } from "../dtos/user.dto";
import { DtoValidatorMiddlehare } from "../middlewhare/dtovalidator";

dotenv.config();
const user = db.Users;
const saltRounds = 13;
export const register = async (req: express.Request, res: express.Response) => {
  let userData = plainToClass(userDto, req.body)
  let isNotValidUser = await DtoValidatorMiddlehare.dtoValidate(userData)
  if (isNotValidUser.length > 0) {
    res.json(isNotValidUser);
  } else {
    bcrypt.hash(userData.password, saltRounds, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: err });
      } else {
        try {
          const data: any = await user.create({
            fname: userData.fname,
            lname: userData.lname,
            email: userData.email,
            phone: userData.phone,
            role: rolesEnum[userData.role],
            accountType: AccountTypeEnum[0],
            password: hash,
          });
          return res.send(data);
        } catch (error) {
          return res.json(error);
        }
      }
    });
  }
};
export const login = async (req: express.Request, res: express.Response) => {
  let userlogindata = plainToClass(UserLoginDto, req.body)
  let isNotValidUserLoginData = await DtoValidatorMiddlehare.dtoValidate(userlogindata);
  if (isNotValidUserLoginData.length > 0) {
    res.json(isNotValidUserLoginData);
  }
  else {
    let currentUser: any = await user.findAll({
      where: { email: req.body.email },
    });
    if (currentUser.length > 0) {
      bcrypt.compare(
        req.body.password,
        currentUser[0].password,
        (compErr) => {
          if (compErr) {
            return res.json({ compErr, message: "mismatch err" });
          }
          else {
            const jwtToken = jwt.sign({
              fname: currentUser[0].fname, lname: currentUser[0].lname, email: currentUser[0].email
            },
              process.env.SECRET_KEY,
              {
                expiresIn: process.env.SECRET_KEY_EXPIRY_DAY
              })
            return res.json({ message: 'success', token: jwtToken }).status(200);
          }
        }
      );
    } else {
      return res.json({ message: "no user found with this email" });
    }
  }
};
