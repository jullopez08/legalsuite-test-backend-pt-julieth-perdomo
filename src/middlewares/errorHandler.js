const errorHandler =( err, req, res, next) =>{
    console.error(err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error del Servidor';

    res.status(statusCode).json({
        status: 'error',
        message: message
    });
};
 
module.exports = errorHandler;