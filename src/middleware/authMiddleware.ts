import { Request, Response, NextFunction } from 'express';

// Pegar o Token no Authorization !!
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log('KKKKKKK FISDJOFI');

    next();
};