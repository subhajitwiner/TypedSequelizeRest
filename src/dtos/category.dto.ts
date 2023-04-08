import { IsNotEmpty, IsOptional, IsString } from "class-validator";
export class CategoryDto{
    @IsNotEmpty()
    @IsString()
    categoryName: string;
    @IsNotEmpty()
    @IsString()
    categoryDescription: string;
}
export class UpdateCategoryDto{
    @IsOptional()
    @IsString()
    categoryName: string;
    @IsOptional()
    @IsString()
    categoryDescription: string;
}