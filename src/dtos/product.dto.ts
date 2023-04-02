import { IsString, IsNotEmpty, IsDecimal, IsOptional, IsNumber } from 'class-validator';

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
export class UpdateProductDto{
    @IsOptional()
    @IsString()
    name: string;
    @IsOptional()
    @IsString()
    image: string;
    @IsOptional()    
    @IsString()
    category: string;
    @IsOptional()
    @IsNumber()
    price: number;
}