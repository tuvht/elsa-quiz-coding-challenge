import {
    createQuiz,
    updateQuiz,
    getQuiz,
    getQuizes
} from '../services/quiz.service.js';
import { APIError } from '../utils/error.response.js';

export const createQuizAPI = async (req, res, next) => {
    try {
        const result = await createQuiz(req.body);
        if (result.error) {
            throw new APIError(
                'INVALID',
                result.errorCode,
                result.errorMessage,
                true
            );
        } else {
            return res.status(result.errorCode).json(result.data);
        }
    } catch (error) {
        return next(error);
    }
};

export const updateQuizAPI = async (req, res, next) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const result = await updateQuiz({id, name});
        if (result.error) {
            throw new APIError(
                'INVALID',
                result.errorCode,
                result.errorMessage,
                true
            );
        } else {
            return res.status(result.errorCode).json(result.data);
        }
    } catch (error) {
        return next(error);
    }
};

export const getQuizAPI = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await getQuiz(id);
        if (result.error) {
            throw new APIError(
                'INVALID',
                result.errorCode,
                result.errorMessage,
                true
            );
        } else {
            return res.status(result.errorCode).json(result.data);
        }
    } catch (error) {
        return next(error);
    }
};

export const getQuizesAPI = async (req, res, next) => {
    try {
        const result = await getQuizes();
        if (result.error) {
            throw new APIError(
                'INVALID',
                result.errorCode,
                result.errorMessage,
                true
            );
        } else {
            return res.status(result.errorCode).json(result.data);
        }
    } catch (error) {
        return next(error);
    }
};
