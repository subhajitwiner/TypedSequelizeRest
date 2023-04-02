import express from 'express';
import {QuestionDto} from '../dtos/question.dto';
import { plainToClass } from 'class-transformer';
import { DtoValidatorMiddlehare } from '../middlewhare/dtovalidator';
import { QuestionService } from '../services/question.service';

export class QuestionController{
    questionService:QuestionService = new QuestionService();
    create = async (req: express.Request, res:express.Response ) =>{
        let questionData = plainToClass(QuestionDto, req.body);
        let isNotValidQuestion = await DtoValidatorMiddlehare.dtoValidate(questionData);
        if (isNotValidQuestion.length > 0) {
            res.status(412).json(isNotValidQuestion);
          } else {
            let result = await this.questionService.create(questionData);
            res.status(result.status).json(result.data);
          }
    }
    edit = (req: express.Request, res:express.Response ) =>{}
    delete = async (req: express.Request, res:express.Response ) =>{
        if(req.params.id){
            let result = await this.questionService.delete(req.params.id);
            res.status(result.status).json(result.data);
        }
        else{
            res.status(412).json('id is required');
        }
    }
    displayAll = async (req: express.Request, res:express.Response ) => {
        let result = await this.questionService.displayAll();
        res.status(result.status).json(result.data);
    }
    displayOne = (req: express.Request, res:express.Response ) => {}
}