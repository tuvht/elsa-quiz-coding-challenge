import { 
    createQuestion,
    updateQuestion,
    getQuestion,
    getQuestions,
    validateAndScoring,
    getLeaderboard
} from '../services/question.service.js';
import { createScore, updateScore } from '../services/score.service.js';
import { APIError } from '../utils/error.response.js';

export const createQuestionAPI = async (req, res, next) => {
    try {
        const result = await createQuestion(req.body);
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

export const updateQuestionAPI = async (req, res, next) => {
    try {
        const { title, correctAnswer, score } = req.body;
        const { id } = req.params;
        const result = await updateQuestion({ id, title, correctAnswer, score });
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

export const getQuestionAPI = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await getQuestion(id);
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

export const getQuestionsAPI = async (req, res, next) => {
    try {
        const { quiz, userSession } = req.query;
        const sessionID = userSession || req.session.id;
        const result = await getQuestions(quiz);
        if (result.error) {
            throw new APIError(
                'INVALID',
                result.errorCode,
                result.errorMessage,
                true
            );
        } else {
            const scoreResult = await createScore(quiz, sessionID);
            if (scoreResult.isExisted) {
                updateScore(quiz, sessionID, 0, true);
            }

            return res.status(result.errorCode).json({
                error: false,
                errorCode: result.errorCode,
                data: result.data,
                sessionID
            });
        }
    } catch (error) {
        return next(error);
    }
};

export const validateAndScoringAPI = async (req, res, next) => {
    try {
        const { quiz, sessionID } = req.body;
        const result = await validateAndScoring(req.body);
        if (result.error) {
            throw new APIError(
                'INVALID',
                result.errorCode,
                result.errorMessage,
                true
            );
        } else {
            const scoreResult = await updateScore(quiz, sessionID, result.score);
            if (scoreResult.error) {
                throw new APIError(
                    'INVALID',
                    scoreResult.errorCode,
                    scoreResult.errorMessage,
                    true
                );
            } else {
                return res.status(result.errorCode).json({
                    error: false,
                    errorCode: scoreResult.errorCode,
                    score: scoreResult.data.score
                });
            }
        }
    } catch (error) {
        return next(error);
    }
};

export const getLeaderboardAPI = async (req, res, next) => {
    try {
        const result = await getLeaderboard(req.body);
        if (result.error) {
            throw new APIError(
                'INVALID',
                result.errorCode,
                result.errorMessage,
                true
            );
        } else {
            return res.status(result.errorCode).json({
                error: false,
                errorCode: result.errorCode,
                data: result.data
            });
        }
    } catch (error) {
        return next(error);
    }
};