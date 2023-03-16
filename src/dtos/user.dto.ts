import { IsEmail, IsString, IsInt, IsNotEmpty,   } from 'class-validator';

export class userDto{
    @IsNotEmpty()
    @IsString()
    fname: string;
    @IsNotEmpty()
    @IsString()
    lname: string;
    @IsNotEmpty()
    @IsInt()
    phone: number;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    role: number;
    accountType: number;
    @IsNotEmpty()
    @IsString()
    password: string;
}
export class UserLoginDto{
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsString()
    password: string;
}
