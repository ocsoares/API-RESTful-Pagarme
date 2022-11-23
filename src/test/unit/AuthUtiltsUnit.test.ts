import 'dotenv/config';
import { atlasTestDBConnection } from "../../config/database";
import { AuthUtils } from "../../utils/AuthUtils";
import { IUserAccount } from '../../@types/interfaces';

beforeAll(async () => {
    await atlasTestDBConnection();
});

describe('AuthUtils Unit Test', () => {

    it('Should be possible search a user if exists', async () => {
        const searchUser = await AuthUtils.searchUserByUsername(process.env.TEST_USERNAME as string);

        expect(searchUser).not.toBe(false);
    });

    it('Should be possible generate a JWT', async () => {
        // User need to exist !!
        const searchUser = await AuthUtils.searchUserByUsername(process.env.TEST_USERNAME as string) as IUserAccount;

        const JWT = await AuthUtils.generateJWT(searchUser, 'any_hash', '1h');

        expect(JWT).toBe<string>;
    });

});