import { Request, Response, NextFunction } from 'express';
/**
 * Express API error handler.
 */
function errorHandler(error: { status: number, message: string }, request: Request, response: Response, next: NextFunction) {
  const { status = 500, message = "Something went wrong!" } = error;
  response.status(status).json({ error: message });
}

export default errorHandler;