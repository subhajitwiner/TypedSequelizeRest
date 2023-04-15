import express from 'express';
import { TokenValidatorMiddlehare } from '../middlewhare/tokenvalidator';
import { QuestionController } from '../controllers/question.controller';
export const QuestionRouter = (router: express.Router, prefix='') =>{
    
    let question = new QuestionController();
    router.post(prefix+'/create',TokenValidatorMiddlehare.tokenValidate,question.create);
    router.put(prefix+'/edit/:id',TokenValidatorMiddlehare.tokenValidate, question.edit);
    router.get(prefix+'/displayone/:id',TokenValidatorMiddlehare.tokenValidate, question.displayOne);
    router.get(prefix+'/displayall',TokenValidatorMiddlehare.tokenValidate,question.displayAll);
    router.delete(prefix+'/delete/:id',TokenValidatorMiddlehare.tokenValidate,question.delete);
}