import Score from '../models/ScoreSchema.js';

export const createScore = async (quizID, sessionID) => {
    try {
        let result = await Score.findOne({ quiz: quizID, sessionID });
        if (result) {
            return {
                error: true,
                errorCode: 400,
                errorMessage: 'Score Already Exists',
                isExisted: true
            };
        }

        const score = new Score({ quiz: quizID, sessionID });
        const response = score.save();
        if (response) {
            return {
                error: false,
                errorCode: 200,
                data: score
            };
        } else {
            return {
                error: true,
                errorCode: 400,
                errorMessage: 'Create score has failed'
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

export const updateScore = async (quizID, sessionID, score, isReset = false) => {
    try {
        let result = await Score.findOne({ quiz: quizID, sessionID });
        if (isReset) {
            result.score = 0;
        } else {
            result.score += score;
        }

        const response = result.save();
        if (response) {
            return {
                error: false,
                errorCode: 200,
                data: result
            };
        } else {
            return {
                error: true,
                errorCode: 400,
                errorMessage: 'Update score has failed'
            };
        }
    } catch (error) {
        return {
            error: true,
            errorCode: 400,
            errorMessage: error.message
        };
    }
}