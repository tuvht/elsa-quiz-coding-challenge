import Question from '../models/QuestionSchema.js';
import ScoreSchema from '../models/ScoreSchema.js';

export const createQuestion = async (data) => {
    try {
        const { quiz, title, answers, correctAnswer, score } = data;
        let result = await Question.findOne({ title });
        if (result) {
            return {
                error: true,
                errorCode: 400,
                errorMessage: 'Question Already Exists'
            };
        }

        const question = new Question({
            quiz,
            title,
            answers,
            correctAnswer,
            score
        });
        const response = question.save();
        if (response) {
            return {
                error: false,
                errorCode: 200,
                data: question
            };
        } else {
            return {
                error: true,
                errorCode: 400,
                errorMessage: 'Create question has failed'
            };
        }
    } catch (error) {
        return {
            error: true,
            errorCode: 400,
            errorMessage: error.message
        };
    }
};

export const updateQuestion = async (data) => {
    try {
        const { id, title, correctAnswer, score } = data;
        let question = await Question.findOne({ _id: id });
        if (!question) {
            return {
                error: true,
                errorCode: 400,
                errorMessage: 'Question is not existed'
            };
        }

        if (title) {
            question.title = title;
        }
        if (correctAnswer) {
            question.correctAnswer = correctAnswer;
        }
        if (score) {
            question.score = score;
        }

        const response = question.save();
        if (response) {
            return {
                error: false,
                errorCode: 200,
                data: question
            };
        } else {
            return {
                error: true,
                errorCode: 400,
                errorMessage: 'Update question has failed'
            };
        }
    } catch (error) {
        return {
            error: true,
            errorCode: 400,
            errorMessage: error.message
        };
    }
};

export const getQuestion = async (id) => {
    try {
        let result = await Question.findOne({ _id: id });
        if (!result) {
            return {
                error: true,
                errorCode: 400,
                errorMessage: 'Question is not existed'
            };
        }

        return {
            error: false,
            errorCode: 200,
            data: result
        };
    } catch (error) {
        return {
            error: true,
            errorCode: 400,
            errorMessage: error.message
        };
    }
};

export const getQuestions = async (quiz) => {
    try {
        let result = await Question.find({ quiz: quiz });
        if (!result) {
            return {
                error: true,
                errorCode: 400,
                errorMessage: 'Questions not found'
            };
        }

        return {
            error: false,
            errorCode: 200,
            data: result
        };
    } catch (error) {
        return {
            error: true,
            errorCode: 400,
            errorMessage: error.message
        };
    }
};

export const validateAndScoring = async (data) => {
    try {
        const { correctAnswer, question } = data;
        let result = await Question.findOne({ _id: question, correctAnswer });
        if (!result) {
            return {
                error: false,
                errorCode: 200,
                errorMessage: 'Answer is not correct',
                score: 0
            };
        }

        const questionScore = result.score;
        return {
            error: false,
            errorCode: 200,
            errorMessage: 'Answer is corrected',
            score: questionScore
        };
    } catch (error) {
        return {
            error: true,
            errorCode: 400,
            errorMessage: error.message
        };
    }
};

export const getLeaderboard = async (data) => {
    try {
        const { quiz, users } = data;
        let result = await ScoreSchema.find({
            quiz: quiz,
            sessionID: {
                $in: users
            }
        });

        if (!result) {
            return {
                error: false,
                errorCode: 200,
                errorMessage: 'Data is not found',
                score: 0
            };
        }

        return {
            error: false,
            errorCode: 200,
            data: result.sort((a, b) => b.score - a.score) || []
        };
    } catch (error) {
        return {
            error: true,
            errorCode: 400,
            errorMessage: error.message
        };
    }
};
