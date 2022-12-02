import 'dotenv/config';
import { IJWT, IUserAccount } from '../@types/interfaces';
import { UserModel } from '../models/UserModel';
import jwt from 'jsonwebtoken';
import { staticInterfaceMethods } from './staticInterfaceMethodsUtils';

// const expiresIn = dayjs().add(15, 'second').unix(); // Unix transforma em NÚMERICO !!

interface IAuthUtilsMethods {
    searchUserByUsername(username: string): Promise<IUserAccount | false>;
    searchUserByID(id: string): Promise<IUserAccount | false>;
    generateJWT(account: IUserAccount, hash: string, expiresIn: string): Promise<string>;
    checkJWT(token: string, JWT_key: string): IJWT | false;
}

// Needs to be static method of the interface !!
@staticInterfaceMethods<IAuthUtilsMethods>()
export class AuthUtils {

    static async searchUserByUsername(username: string): Promise<IUserAccount | false> {
        const isUserExists = await UserModel.findOne({ username }) as IUserAccount;

        // Don't exits
        if (!isUserExists) {
            return false;
        }

        return isUserExists;
    }

    static async searchUserByID(id: string): Promise<IUserAccount | false> {
        const searchUserByID = await UserModel.findById(id) as IUserAccount;

        if (!searchUserByID) {
            return false;
        }

        return searchUserByID;
    }

    static async generateJWT(account: IUserAccount, expiresIn: string): Promise<string> {
        const JWT = jwt.sign({
            id: account.id,
            username: account.username
        }, "" + process.env.JWT_HASH as string, {
            expiresIn
        });

        return JWT;
    }

    static checkJWT(token: string, JWT_key: string): IJWT | false {
        try {
            const checkJWT = jwt.verify(token, JWT_key);

            return checkJWT as IJWT;
        }
        catch (error: any) {
            return false;
        }
    }
}