import { app } from "../../app";
import request from 'supertest';
import { IUserAccount } from '../../@types/interfaces';
import { atlasTestDBConnection } from "../../config/database";
import { v4 as uuid } from 'uuid';


beforeAll(async () => {
    await atlasTestDBConnection();
});

describe("AuthController Integration Test", () => {

    // MUDAR O expect para aquele que checha o Throw da Rota, e FAZER o expect da outra ali...
    it("Should be possible to create a new user", async () => {
        const getResponse = await request(app).post('/api/auth/register').send(<IUserAccount>{
            username: `${uuid()}`,
            password: 'defaulttest12',
            confirm_password: 'defaulttest12'
        });

        expect(getResponse.statusCode).toBe(201);
    });

    it('Should not be possible to create a new user', async () => {
        const getResponse = await request(app).post('/api/auth/register').send(<IUserAccount>{
            username: process.env.TEST_USERNAME,
            password: 'anypassword12',
            confirm_password: 'anypassword12'
        });
    });

});