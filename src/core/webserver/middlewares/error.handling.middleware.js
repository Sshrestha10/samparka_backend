// src/middleware/errorHandlingMiddleware.js

// eslint-disable-next-line no-unused-vars
export default function errorHandlingMiddleware(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  // Handle MongoDB duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      status: 400,
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
    });
  }

  return res.status(statusCode).json({
    status: statusCode,
    message: err.customMessage || err.message || 'Internal Server Error'
  });
}
