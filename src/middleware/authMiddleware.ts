import { Request, Response, NextFunction } from 'express';
import { BadRequestAPIError, UnauthorizedAPIError } from '../helpers/ErrorAPIHelper';
import { AuthUtils } from '../utils/AuthUtils';

interface IAuthorizationToken {
    authorization: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { authorization }: IAuthorizationToken = req.headers as any;

    if (!authorization) {
        throw new BadRequestAPIError('Insira um token válido no authorization !');
    }

    const [, token] = authorization.split(' ');

    const checkJWT = AuthUtils.checkJWT(token, process.env.JWT_HASH as string);

    if (!checkJWT) {
        throw new UnauthorizedAPIError('Token inválido ou expirado !');
    }

    req.JWT = checkJWT;

    next();
};