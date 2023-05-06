import { db } from "../database/connection";
import * as jwt from "jsonwebtoken";
import { rolesEnum } from "../enums/roles.enum";
import { AccountTypeEnum } from "../enums/accounttype.enum";
import { userDto, UserLoginDto } from "../dtos/user.dto";
import * as dotenv from "dotenv";
import * as bcrypt from "bcrypt";
dotenv.config();
export class UserService {
  user = db.Users;
  constructor() {}
  async createUser(userData: userDto, hashedPassword: string) {
    try {
      const result: any = await this.user.create({
        fname: userData.fname,
        lname: userData.lname,
        email: userData.email,
        phone: userData.phone,
        role: rolesEnum[userData.role],
        accountType: AccountTypeEnum[userData.accountType],
        password: hashedPassword,
      });
      const jwtToken = jwt.sign(
        {
          fname: result.fname,
          lname: result.lname,
          email: result.email,
        },
        process.env.SECRET_KEY,
        { expiresIn: process.env.SECRET_KEY_EXPIRY_DAY }
      );
      return {
        data: { message: "Success", token: jwtToken, data: result },
        status: 201,
      };
    } catch (error) {
      return error;
    }
  }
  
  async loginUser(userData: UserLoginDto) {
    const currentUser: any = await this.user.findAll({
      where: { email: userData.email },
    });
    if (currentUser.length === 0) {
      return {data:{ message: "no user found with this email" }, status:404};
    }
    const passwordMatch = await bcrypt.compare(
      userData.password,
      currentUser[0].password
    );
    if (!passwordMatch) {
      return {data:{ passwordMatch, message: "mismatch err" }, status: 401};
    }
    const jwtToken = jwt.sign(
      {
        fname: currentUser[0].fname,
        lname: currentUser[0].lname,
        email: currentUser[0].email,
      },
      process.env.SECRET_KEY,
      { expiresIn: process.env.SECRET_KEY_EXPIRY_DAY }
    );
    return {
      data: { message: "Success", token: jwtToken },
      status: 200,
    };
  }
}
