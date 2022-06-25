const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: err,
            stack: err.stack
        })
    }

    if (process.env.NODE_ENV === 'production') {
        let error = {...err};

        error.message = err.message

        res.status(error.statusCode).json({
            success: false,
            errorMessage: error.message || 'Something went wrong with the server.'
        })
    }
}