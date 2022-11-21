import { Request, Response, NextFunction } from 'express';
import { ErrorAPIHelper } from '../helpers/ErrorAPIHelper';

export const pageNotFound = (req: Request, res: Response): Response => {
    return res.status(404).json({
        message: 'Page not found !'
    });
};

export const errorAPIMiddleware = (
    error: Error & Partial<ErrorAPIHelper>,
    req: Request,
    res: Response,
    next: NextFunction
): Response => {

    const statusCode = error.statusCode ? error.statusCode : 500;

    const message = error.statusCode ? error.message : 'Internal Server Error';

    return res.status(statusCode).json({
        error: error.name,
        message
    });
};