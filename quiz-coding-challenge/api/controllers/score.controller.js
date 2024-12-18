import { updateScore } from '../services/score.service.js';
import { APIError } from '../utils/error.response.js';

export const updateScoreAPI = async (req, res, next) => {
    try {
        const { quiz, sessionID } = req.body;
        const result = await updateScore(quiz, sessionID, 0);
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