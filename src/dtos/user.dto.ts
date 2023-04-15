import { IsEmail, IsString, IsInt, IsNotEmpty, IsOptional,   } from 'class-validator';


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
    @IsInt()
    @IsOptional()
    role: number;
    @IsInt()
    @IsNotEmpty()
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
