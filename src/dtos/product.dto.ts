import { IsString, IsNotEmpty, IsDecimal } from 'class-validator';

export class ProductDto{
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    image: string;
    @IsNotEmpty()
    @IsString()
    category: string;
    @IsNotEmpty()
    @IsDecimal()
    price: number;
}