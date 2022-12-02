import 'dotenv/config';
import { AuthUtils } from "../../utils/AuthUtils";
import { IUserAccount } from '../../@types/interfaces';

const TEST_USERNAME = process.env.TEST_USERNAME as string;
const TEST_PASSWORD = process.env.TEST_PASSWORD as string;
const JWT_NOT_EXPIRE = process.env.JWT_NOT_EXPIRE as string;
const JWT_HASH = process.env.JWT_HASH as string;

describe('Auth Utils Unit Test', () => {

    it('Should be possible to search a user if exists', async () => {
        const searchUser = await AuthUtils.searchUserByUsername(TEST_USERNAME) as IUserAccount;

        expect(searchUser).not.toBe(false);
    });

    it('Should be possible to generate a JWT', async () => {
        // User need to exist !!
        const searchUser = await AuthUtils.searchUserByUsername(TEST_USERNAME) as IUserAccount;

        const JWT = await AuthUtils.generateJWT(searchUser, '1h');

        expect(JWT).toBe<string>;
    });

    it('Should be possible to check a valid JWT', async () => {
        const checkJWT = AuthUtils.checkJWT(JWT_NOT_EXPIRE, JWT_HASH);

        expect(checkJWT).toHaveProperty('id');
    });

    it('Should NOT be possible to check a INVALID JWT', async () => {
        const checkJWT = AuthUtils.checkJWT('anyjwt', JWT_HASH);

        expect(checkJWT).toBe(false);
    });

});