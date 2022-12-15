import 'dotenv/config';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Logger from '../config/logs';
import { AuthUtils } from '../utils/AuthUtils';
import { BadRequestAPIError, UnauthorizedAPIError } from '../helpers/ErrorAPIHelper';
import { UserModel } from '../models/UserModel';
import bcrypt from 'bcrypt';
import { IUserAccount } from '../@types/interfaces';
import { staticInterfaceMethods } from '../utils/staticInterfaceMethodsUtils';
import { RefreshTokenModel } from '../models/RefreshTokenModel';

interface IAuthMethods {
    register(req: Request, res: Response): Promise<Response>;
    login(req: Request, res: Response): Promise<Response>;
    refreshToken(req: Request, res: Response): Promise<Response>;
}

@staticInterfaceMethods<IAuthMethods>()
export class AuthController {
    static async register(req: Request, res: Response): Promise<Response> {
        const { username, password, confirm_password }: IUserAccount = req.body;

        const userAlreadyExits = await AuthUtils.searchUserByUsername(username);

        if (userAlreadyExits) {
            throw new BadRequestAPIError('Já existe um usuário registrado com esse username !');
        }

        if (password !== confirm_password) {
            throw new BadRequestAPIError('As senhas não coincidem !');
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const saveNewUser = new UserModel({
            username,
            password: hashPassword
        });

        await saveNewUser.save();

        Logger.info(`A conta com o username '${saveNewUser.username}' foi criada com sucesso !`);

        return res.status(StatusCodes.CREATED).json({
            message: 'Account created successfully !',
            accountCreated: {
                username: saveNewUser.username,
                password: saveNewUser.password
            }
        });
    }

    static async login(req: Request, res: Response): Promise<Response> {
        const { username, password }: IUserAccount = req.body;

        const searchUser = await AuthUtils.searchUserByUsername(username);

        if (!searchUser) {
            throw new BadRequestAPIError('Username ou password inválido !');
        }

        const checkPassword = await bcrypt.compare(password, searchUser.password);

        if (!checkPassword) {
            Logger.error(`Alguém tentou acessar a conta '${username}', mas sem sucesso !`);
            throw new BadRequestAPIError('Username ou password inválido !');
        }

        const JWT = await AuthUtils.generateJWT(searchUser, '1h');

        const isRefreshTokenAlreadyExists = await RefreshTokenModel.find({
            account_id: searchUser.id
        });

        if (isRefreshTokenAlreadyExists) {
            await RefreshTokenModel.deleteOne({
                account_id: searchUser.id
            });
        }

        const refreshTokenPermission = await AuthUtils.generateRefreshTokenPermission(searchUser.id);

        return res.json({
            message: 'Authenticated !',
            token: JWT,
            refresh_token_permission: refreshTokenPermission._id
        });
    }

    static async refreshToken(req: Request, res: Response): Promise<Response> {
        const { refresh_token_permission } = req.body;

        try {
            const isRefreshTokenPermission = await RefreshTokenModel.findById(refresh_token_permission);

            if (!isRefreshTokenPermission) {
                throw new UnauthorizedAPIError('Token inválido ou expirado !');
            }

            const userAccount = await UserModel.findById(isRefreshTokenPermission.account_id) as IUserAccount;

            const JWT = await AuthUtils.generateJWT(userAccount, '10d');

            // After generate a refresh token, delete the used permission to prevent generating infinite refresh tokens !
            await RefreshTokenModel.findByIdAndDelete(refresh_token_permission);

            return res.json({
                message: 'Refreshed token !',
                token: JWT
            });
        }
        catch (error: any) {
            throw new UnauthorizedAPIError('Token inválido ou expirado !');
        }
    }
};