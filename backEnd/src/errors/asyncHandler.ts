import { Request, Response, NextFunction } from 'express';

function asyncErrorBoundary(delegate: Function, defaultStatus?: any) {
    return (request: Request, response: Response, next: NextFunction) => {
        Promise.resolve()
            .then(() => delegate(request, response, next))
            .catch((error = {}) => {
                const { status = defaultStatus, message = error } = error;
                next({
                    status,
                    message,
                });
            });
    };
}

export default asyncErrorBoundary;