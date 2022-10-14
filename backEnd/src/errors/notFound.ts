import { Request, Response, NextFunction } from 'express';
/**
 * Express API "Not found" handler.
 */
 function notFound(req : Request, res : Response, next : NextFunction) {
    next({ status: 404, message: `Path not found: ${req.originalUrl}` });
  }
  
  export default notFound;