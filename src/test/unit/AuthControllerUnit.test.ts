import { UserModel } from "../../models/UserModel";
import bcrypt from 'bcrypt';
import atlasDBConnection from "../../config/database";

// REEFAZER isso tudo para passar pela ROTA (ACHO que é integrada) !!

beforeAll(async () => {
    await atlasDBConnection();
});

describe('Register new user', () => {

    it('Should be possible to create a new user', async () => {
        const password = 'humberto12';
        const hashPassword = await bcrypt.hash(password, 10);

        const newAccount = new UserModel({
            username: 'HumbertoDSUIISJIXj',
            password: hashPassword
        });

        await newAccount.save();

        expect(newAccount).toHaveProperty("_id");
    });

});