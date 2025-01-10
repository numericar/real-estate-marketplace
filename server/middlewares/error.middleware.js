export function errorResponseHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        status: false,
        message: message,
        data: null
    });
}

export function errorInstanceHandler(statusCode, message) {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;

    return error;
}