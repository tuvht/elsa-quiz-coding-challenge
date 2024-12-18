import quizRoutes from './api/routes/quiz.route.js';
import questionRoutes from './api/routes/question.route.js';
import { APIError } from './api/utils/error.response.js';
import errorHandler from './api/utils/errorHandler.js';

const router = (app) => {
    app.use('/api/v1/quiz', quizRoutes);
    app.use('/api/v1/question', questionRoutes);
    app.use((req, res, next) => {
        throw new APIError(
            'NOT FOUND',
            404,
            'Endpoint is not found',
            true
        );
    });
    app.use(async (err, req, res, next) => {
        if (!errorHandler.isTrustedError(err)) {
            res.status(400).json({
                status: 400,
                message: err.message
            });
        } else {
            await errorHandler.handleError(err);
            res.status(err.httpCode).json({
                status: err.httpCode,
                message: err.message
            });
        }
    });
    app.get('/', async (req, res) => {
        res.status(400).json({ message: 'Invalid endpoint' });
    });
};

export default router;
