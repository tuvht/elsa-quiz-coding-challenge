import { Router } from 'express';
import {
    createQuizAPI,
    updateQuizAPI,
    getQuizAPI,
    getQuizesAPI
} from '../controllers/quiz.controller.js';

const quizRoutes = Router();

quizRoutes.post('/create', createQuizAPI);

quizRoutes.patch('/update/:id', updateQuizAPI);

quizRoutes.get('/:id', getQuizAPI);

quizRoutes.get('/', getQuizesAPI);

export default quizRoutes;
