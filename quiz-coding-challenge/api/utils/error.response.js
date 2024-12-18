const HttpStatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500
};

export class BaseError extends Error {
    name;
    httpCode;
    isOperational;
    constructor(name, httpCode, description, isOperational) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}

export class APIError extends BaseError {
    constructor(name, httpCode = HttpStatusCode.INTERNAL_SERVER, description = 'internal server error', isOperational = true) {
        super(name, httpCode, description, isOperational);
    }
}
