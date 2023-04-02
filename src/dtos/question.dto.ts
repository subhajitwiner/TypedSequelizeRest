import { IsBoolean, IsNumber, IsString } from 'class-validator';

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
    parrentQuestionId: number;
    @IsNumber()
    order: number;
}