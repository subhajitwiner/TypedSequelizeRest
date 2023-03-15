import express from "express";
import { db } from "../database/connection";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import {AccountTypeEnum} from '../enums/accountType.enum';
import { rolesEnum } from '../enums/roles.enum';
import * as dotenv from 'dotenv';

dotenv.config(); 
const user = db.Users;
const saltRounds = 13;
export const register = async (req: express.Request, res: express.Response) => {
  if (req.body) {
    if (req.body.password) {
      bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        if (err) {
          return res.status(500).json({ error: err });
        } else {
          try {
            const data:any = await user.create({
              fname: req.body.fname,
              lname: req.body.lname,
              email: req.body.email,
              phone: req.body.phone,
              role:  rolesEnum[req.body.role],
              accountType: AccountTypeEnum[0],
              password: hash,
            });
            return res.send(data);
          } catch (error) {
            return res.json(error);
          }
        }
      });
    } else {
      return res.json({ message: "password missing" });
    }
  } else {
    return res.json({ message: "input missing" });
  }
};
export const login = async (req: express.Request, res: express.Response) => {
  if (req.body) {
    if (req.body.email) {
      let currentUser: any = await user.findAll({
        where: { email: req.body.email },
      });
      if (currentUser.length > 0) {
        if (req.body.password) {
          bcrypt.compare(
            req.body.password,
            currentUser[0].password,
            (compErr) => {
              if (compErr) {
                return res.json({ compErr, message: "mismatch err" });
              }
              else{
                const jwtToken =   jwt.sign({
                    fname: currentUser[0].fname, lname: currentUser[0].lname, email: currentUser[0].email
                  },
                  process.env.SECRET_KEY,
                  {
                    expiresIn: process.env.SECRET_KEY_EXPIRY_DAY
                  })
                  return res.json({ message: 'success', token:jwtToken }).status(200);
              }
            }
          );
        } else {
        }
      } else {
        return res.json({ message: "no user found with this email" });
      }
    } else {
      return res.json({ message: "email missing" });
    }
  } else {
    return res.json({ message: "input missing" });
  }
};
