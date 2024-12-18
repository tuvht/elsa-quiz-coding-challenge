import { BaseError } from './error.response.js';
import logger from './winston.log.js';

class ErrorHandler {
    async handleError(err) {
        await logger.error(
            err.message,
            err,
        );
    };

    isTrustedError(error) {
        if (error instanceof BaseError) {
            return error.isOperational;
        }

        return false;
    };
}

const errorHandler = new ErrorHandler();

export default errorHandler;
