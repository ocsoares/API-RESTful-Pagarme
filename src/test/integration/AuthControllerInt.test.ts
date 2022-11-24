import { app } from "../../app";
import request from 'supertest';
import { IUserAccount } from '../../@types/interfaces';
import { atlasTestDBConnection } from "../../config/database";
import { v4 as uuid } from 'uuid';
import { BadRequestErrorMessages } from '../../@types/errorAPIMessages';

const registerPost = async (urlRoute: string, username: string,
    password: string, confirm_password: string
): Promise<request.Response> => {

    const getResponse = await request(app).post(urlRoute).send(<IUserAccount>{
        username,
        password,
        confirm_password
    });

    return getResponse;
};

const loginGet = async (urlRoute: string, username: string,
    password: string
): Promise<request.Response> => {

    const getResponse = await request(app).get(urlRoute).send(<IUserAccount>{
        username,
        password
    });

    return getResponse;
};

const registerURLRoute = '/api/auth/register';
const loginURLRoute = '/api/auth/login';

beforeAll(async () => {
    await atlasTestDBConnection();
});

describe("AuthController Integration Test", () => {

    it("Should be possible to create a new user", async () => {
        const getResponse = await registerPost(registerURLRoute, uuid(), 'anypassword12', 'anypassword12');

        expect(getResponse.statusCode).toBe(201);
    });

    it('Should NOT be possible to create a new user', async () => {
        const getResponse = await registerPost(registerURLRoute,
            process.env.TEST_USERNAME as string, 'anypassword12', 'anypassword12');

        const errorJSON = JSON.parse(getResponse.text);
        const { message } = errorJSON;

        const expectError: BadRequestErrorMessages = 'Já existe um usuário registrado com esse username !';

        expect(message).toBe(expectError);
    });

    it('Should be possible to login', async () => {
        const getResponse = await loginGet(loginURLRoute, process.env.TEST_USERNAME as string,
            process.env.TEST_PASSWORD as string
        );

        expect(getResponse.statusCode).toBe(200);
    });

    it('Should NOT be possible to login', async () => {
        const getResponse = await loginGet(loginURLRoute, process.env.TEST_USERNAME as string,
            'wrongpassword12'
        );

        expect(getResponse.statusCode).toBe(400);
    });

});