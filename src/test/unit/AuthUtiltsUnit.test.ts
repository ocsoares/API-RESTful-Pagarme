import 'dotenv/config';
import { cleanTestDBConnection } from "../../config/database";
import { AuthUtils } from "../../utils/AuthUtils";
import { IUserAccount } from '../../@types/interfaces';

afterAll(async () => {
    await cleanTestDBConnection();
});

const TEST_USERNAME = process.env.TEST_USERNAME as string;
const TEST_PASSWORD = process.env.TEST_PASSWORD as string;

describe('AuthUtils Unit Test', () => {

    it('Should be possible search a user if exists', async () => {
        const searchUser = await AuthUtils.searchUserByUsername(TEST_USERNAME);

        expect(searchUser).not.toBe(false);
    });

    it('Should be possible generate a JWT', async () => {
        // User need to exist !!
        const searchUser = await AuthUtils.searchUserByUsername(TEST_USERNAME) as IUserAccount;

        const JWT = await AuthUtils.generateJWT(searchUser, 'any_hash', '1h');

        expect(JWT).toBe<string>;
    });

});