import express from "express";
import { QuestionDto, UpdateQuestionDto } from "../dtos/question.dto";
import { plainToClass } from "class-transformer";
import { DtoValidatorMiddlehare } from "../middlewhare/dtovalidator";
import { QuestionService } from "../services/question.service";
import { isNumber } from "class-validator";

export class QuestionController {
  questionService: QuestionService = new QuestionService();
  create = async (req: express.Request, res: express.Response) => {
    let questionData = plainToClass(QuestionDto, req.body);
    let isNotValidQuestion = await DtoValidatorMiddlehare.dtoValidate(
      questionData
    );
    if (isNotValidQuestion.length > 0) {
      res.status(412).json(isNotValidQuestion);
    } else {
      let result = await this.questionService.create(questionData);
      res.status(result.status).json(result.data);
    }
  };
  edit = async (req: express.Request, res: express.Response) => {
    let qid = req.params.id;
    if (!qid || isNumber(qid)) {
      return res.status(400).json({ message: "invalid question id" });
    }
    let questionData = plainToClass(UpdateQuestionDto, req.body);
    let isNotValidQuestion = await DtoValidatorMiddlehare.dtoValidate(
      questionData
    );
    if (isNotValidQuestion.length > 0) {
      return res.status(400).json(isNotValidQuestion);
    } else {
      let result = await this.questionService.edit(Number(qid), questionData);
      res.status(result.status).json(result.data);
    }
  };
  delete = async (req: express.Request, res: express.Response) => {
    if (req.params.id) {
      let result = await this.questionService.delete(req.params.id);
      res.status(result.status).json(result.data);
    } else {
      res.status(412).json("id is required");
    }
  };
  displayAll = async (req: express.Request, res: express.Response) => {
    let result = await this.questionService.displayAll();
    res.status(result.status).json(result.data);
  };
  displayOne = async (req: express.Request, res: express.Response) => {
    if (req.params.id) {
      let result = await this.questionService.displayOne(Number(req.params.id));
      res.status(result.status).json(result.data);
    } else {
      res.status(412).json("id is required");
    }
  };
}
