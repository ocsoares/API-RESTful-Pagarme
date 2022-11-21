import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Logger from '../config/logs';
import { AuthUtils } from '../utils/AuthUtils';
import { BadRequestAPIError } from '../helpers/ErrorAPIHelper';
import { UserModel } from '../models/UserModel';
import bcrypt from 'bcrypt';
import { IUserAccount } from '../@types/interfaces';

export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction): Promise<Response> {
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

    static async login(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { username, password }: IUserAccount = req.body;

        const searchUser = await AuthUtils.searchUserByUsername(username);

        if (!searchUser) {
            throw new BadRequestAPIError('Username ou password inválido !');
        }

        const checkPassword = await bcrypt.compare(password, searchUser.password);

        if (!checkPassword) {
            throw new BadRequestAPIError('Username ou password inválido !');
        }

        // No expiresIn, utilizar, se necessário, a lib dayjs
        const JWT = await AuthUtils.generateJWT(searchUser, process.env.JWT_HASH as string, '1h');

        return res.json({
            message: 'Authenticated !',
            token: JWT
        });
    }
};