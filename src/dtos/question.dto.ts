import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class QuestionDto{
    @IsString()
    question: string;
    @IsNumber()
    type: number;
    @IsBoolean()
    isRequired: boolean;
    @IsNumber()
    maxLength: number;
    @IsNumber()
    minLength: number;
    @IsNumber()
    @IsOptional()
    parrentQuestionId: number;
    @IsNumber()
    order: number;
}
export class UpdateQuestionDto{
    @IsOptional()
    @IsString()
    question: string;
    @IsOptional()
    @IsNumber()
    type: number;
    @IsOptional()
    @IsBoolean()
    isRequired: boolean;
    @IsOptional()
    @IsNumber()
    maxLength: number;
    @IsOptional()
    @IsNumber()
    minLength: number;
    @IsOptional()
    @IsNumber()
    parrentQuestionId: number;
    @IsOptional()
    @IsNumber()
    order: number;
}