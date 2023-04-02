import { QuestionDto } from "../dtos/question.dto";
import { db } from "../database/connection";
export class QuestionService{
    private question = db.Questions;
    displayAll() {
        try {
            const data = this.question.findAll();
            return {
                data:{ message: "Questions fetch successfully", date:data},
                status: 200,
            }
        } catch (error) {
            return {
                data:{ message: "Questions cannot be fetched",error: error},
                status: 500,
            }
        }
    }
    async create(questionData:QuestionDto){
        try {
            const data = await this.question.create({
                question: questionData.question,
                type: questionData.type,
                isRequired: questionData.isRequired,
                maxLength: questionData.maxLength,
                minLength: questionData.minLength,
                parrentQuestionId: questionData.parrentQuestionId,
                order: questionData.order
            });
            return {
                data:{ message: "Question created successfully", date:data},
                status: 201,
            }
        } 
        catch (error) {
            return {
                data: { message: "cannot create question", err: error },
                status: 500,
            };  
        }
    }
    async delete(id: string) {
        try {
            const data = await this.question.destroy({
                where: {
                  id: id
                }
              });
              return {
                data:{ message: "Question deleted successfully", date:data},
                status: 200,
            }
        } 
        catch (error) {
            return {
                data: { message: "cannot create question", err: error },
                status: 500,
            };  
        }
    }
}