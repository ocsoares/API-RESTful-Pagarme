import { IUserAccount } from '../@types/interfaces';
import { UserModel } from '../models/UserModel';
import jwt from 'jsonwebtoken';
import { staticInterfaceMethods } from './staticInterfaceMethodsUtils';

// const expiresIn = dayjs().add(15, 'second').unix(); // Unix transforma em NÚMERICO !!

interface IAuthUtilsMethods {
    searchUserByUsername(username: string): Promise<IUserAccount | false>;
    generateJWT(account: IUserAccount, hash: string, expiresIn: string): Promise<string>;
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

    static async generateJWT(account: IUserAccount, hash: string, expiresIn: string): Promise<string> {
        const JWT = jwt.sign({
            id: account._id.toString(),
            username: account.username
        }, "" + hash, {
            expiresIn
        });

        return JWT;
    }
}