// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  let code = err.code || 'INTERNAL_SERVER_ERROR';

  // In production, mask internal server error messages to prevent leaking secrets/paths
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Internal Server Error';
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
    code = 'VALIDATION_ERROR';
  }

  // Handle Mongoose duplicate key errors
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
    code = 'DUPLICATE_ERROR';
  }
  
  // Handle Zod validation errors
  if (err.name === 'ZodError') {
    statusCode = 400;
    const zodErrors = err.errors || err.issues || [];
    message = zodErrors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
    code = 'VALIDATION_ERROR';
  }

  res.status(statusCode).json({
    success: false,
    message,
    code,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = { errorHandler };
