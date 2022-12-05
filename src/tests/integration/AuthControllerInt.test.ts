import { app } from "../../app";
import request from 'supertest';
import { IUserAccount } from '../../@types/interfaces';
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

const loginPost = async (urlRoute: string, username: string,
    password: string
): Promise<request.Response> => {

    const getResponse = await request(app).post(urlRoute).send(<IUserAccount>{
        username,
        password
    });

    return getResponse;
};

const registerURLRoute = '/api/auth/register';
const loginURLRoute = '/api/auth/login';
const TEST_USERNAME = process.env.TEST_USERNAME as string;
const TEST_PASSWORD = process.env.TEST_PASSWORD as string;

describe("AuthController Integration Test", () => {

    it("Should be possible to create a new user", async () => {
        const getResponse = await registerPost(registerURLRoute, TEST_USERNAME,
            TEST_PASSWORD, TEST_PASSWORD);

        expect(getResponse.statusCode).toBe(201);
    });

    it('Should NOT be possible to create a new user', async () => {
        const getResponse = await registerPost(registerURLRoute,
            TEST_USERNAME, 'anypassword12', 'anypassword12');

        const errorJSON = JSON.parse(getResponse.text);
        const { message } = errorJSON;

        const expectError: BadRequestErrorMessages = 'Já existe um usuário registrado com esse username !';

        expect(message).toBe(expectError);
    });

    it('Should be possible to login', async () => {
        const getResponse = await loginPost(loginURLRoute, TEST_USERNAME,
            TEST_PASSWORD
        );

        expect(getResponse.statusCode).toBe(200);
    });

    it('Should NOT be possible to login', async () => {
        const getResponse = await loginPost(loginURLRoute, TEST_USERNAME,
            'wrongpassword12'
        );

        expect(getResponse.statusCode).toBe(400);
    });

});