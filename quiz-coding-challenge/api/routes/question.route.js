import { Router } from 'express';
import {
    createQuestionAPI,
    updateQuestionAPI,
    getQuestionAPI,
    getQuestionsAPI,
    validateAndScoringAPI,
    getLeaderboardAPI
} from '../controllers/question.controller.js';

const questionRoutes = Router();

questionRoutes.post('/create', createQuestionAPI);

questionRoutes.patch('/update/:id', updateQuestionAPI);

questionRoutes.get('/:id', getQuestionAPI);

questionRoutes.get('/', getQuestionsAPI);

questionRoutes.post('/validate', validateAndScoringAPI);

questionRoutes.post('/getLeaderboard', getLeaderboardAPI);

export default questionRoutes;
