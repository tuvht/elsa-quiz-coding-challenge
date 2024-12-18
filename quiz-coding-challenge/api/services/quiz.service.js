import Quiz from '../models/QuizSchema.js';

export const createQuiz = async (data) => {
    try {
        const { name } = data;
        let result = await Quiz.findOne({ name });
        if (result) {
            return {
                error: true,
                errorCode: 400,
                errorMessage: 'Quiz Already Exists'
            };
        }

        const quiz = new Quiz({ name });
        const response = quiz.save();
        if (response) {
            return {
                error: false,
                errorCode: 200,
                data: quiz
            };
        } else {
            return {
                error: true,
                errorCode: 400,
                errorMessage: 'Create quiz has failed'
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

export const updateQuiz = async (data) => {
    try {
        const { id, name } = data;
        let quiz = await Quiz.findOne({ _id: id });
        if (!quiz) {
            return {
                error: true,
                errorCode: 400,
                errorMessage: 'Quiz is not existed'
            };
        }

        quiz.name = name;
        const response = quiz.save();
        if (response) {
            return {
                error: false,
                errorCode: 200,
                data: quiz
            };
        } else {
            return {
                error: true,
                errorCode: 400,
                errorMessage: 'Update quiz has failed'
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

export const getQuiz = async (id) => {
    try {
        let result = await Quiz.findOne({ _id: id });
        if (!result) {
            return {
                error: true,
                errorCode: 400,
                errorMessage: 'Quiz is not existed'
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

export const getQuizes = async () => {
    try {
        let result = await Quiz.find();
        if (!result) {
            return {
                error: true,
                errorCode: 400,
                errorMessage: 'Quizes not found'
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
