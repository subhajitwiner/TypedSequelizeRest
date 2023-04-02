import { DataTypes, Sequelize } from "sequelize";

export class QuestionModel{
    static schema = (sequelize: Sequelize) => {
        const question = sequelize.define('question', {
            question: {
                type: DataTypes.STRING,
                allowNull: false
            },
            type: {
                type: DataTypes.DECIMAL(3,0),
                allowNull: false
            },
            isRequired:{
                type: DataTypes.BOOLEAN,
                allowNull:false
            },
            maxLength:{
                type: DataTypes.INTEGER,
                allowNull:true
            },
            minLength:{
                type: DataTypes.INTEGER,
                allowNull: true
            },
            parrentQuestionId:{
                type: DataTypes.INTEGER,
                allowNull:true
            },
            order:{
                type: DataTypes.INTEGER,
                allowNull: false
            }
        })
        return question;
    }
}