import { Request, Response, NextFunction } from 'express';
import { BadRequestAPIError, UnauthorizedAPIError } from '../helpers/ErrorAPIHelper';
import { UserModel } from '../models/UserModel';
import { AuthUtils } from '../utils/AuthUtils';

interface IAuthorizationToken {
    authorization: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { authorization }: IAuthorizationToken = req.headers as any;

    if (!authorization) {
        throw new BadRequestAPIError('Insira um token válido no authorization !');
    }

    const [, token] = authorization.split(' ');

    const checkJWT = AuthUtils.checkJWT(token, process.env.JWT_HASH as string);

    if (!checkJWT) {
        throw new UnauthorizedAPIError('Token inválido ou expirado !');
    }

    const searchUserByJWTID = await AuthUtils.searchUserByID(checkJWT.id);

    if (!searchUserByJWTID) {
        throw new UnauthorizedAPIError('Token inválido ou expirado !');
    }

    req.JWT = checkJWT;

    next();
};