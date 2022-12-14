import { app } from "../../app";
import request from 'supertest';
import { IUserAccount } from '../../@types/interfaces';
import { BadRequestErrorMessages } from '../../@types/errorAPIMessages';
import { RefreshTokenModel } from "../../models/RefreshTokenModel";

const registerPostRoute = async (urlRoute: string, username: string,
    password: string, confirm_password: string
): Promise<request.Response> => {

    const getResponse = await request(app).post(urlRoute).send(<IUserAccount>{
        username,
        password,
        confirm_password
    });

    return getResponse;
};

const loginPostRoute = async (urlRoute: string, username: string,
    password: string
): Promise<request.Response> => {

    const getResponse = await request(app).post(urlRoute).send(<IUserAccount>{
        username,
        password
    });

    return getResponse;
};

const refreshTokenPostRoute = async (urlRoute: string,
    refresh_token_permission: string
): Promise<request.Response> => {

    const getResponse = await request(app).post(urlRoute).send({
        refresh_token_permission
    });

    return getResponse;

};

const registerURLRoute = '/api/auth/register';
const loginURLRoute = '/api/auth/login';
const refreshTokenURLRoute = '/api/auth/refresh-token';
const TEST_USERNAME = process.env.TEST_USERNAME as string;
const TEST_PASSWORD = process.env.TEST_PASSWORD as string;

describe("AuthController Integration Test", () => {

    it("Should be possible to create a new user", async () => {
        const getResponse = await registerPostRoute(registerURLRoute, TEST_USERNAME,
            TEST_PASSWORD, TEST_PASSWORD);

        expect(getResponse.statusCode).toBe(201);
    });

    it('Should NOT be possible to create a new user', async () => {
        const getResponse = await registerPostRoute(registerURLRoute,
            TEST_USERNAME, 'anypassword12', 'anypassword12');

        const errorJSON = JSON.parse(getResponse.text);
        const { message } = errorJSON;

        const expectError: BadRequestErrorMessages = 'J?? existe um usu??rio registrado com esse username !';

        expect(message).toBe(expectError);
    });

    it('Should be possible to login', async () => {
        const getResponse = await loginPostRoute(loginURLRoute, TEST_USERNAME,
            TEST_PASSWORD
        );

        const refreshTokenPermissionResponse = getResponse.body.refresh_token_permission as string;
        const searchRefreshTokenPermission = await RefreshTokenModel.findById(refreshTokenPermissionResponse);

        expect(getResponse.statusCode).toBe(200);
        expect(searchRefreshTokenPermission).toHaveProperty('account_id');
    });

    it('Should NOT be possible to login', async () => {
        const getResponse = await loginPostRoute(loginURLRoute, TEST_USERNAME,
            'wrongpassword12'
        );

        expect(getResponse.statusCode).toBe(400);
    });

    it('Should be possible to refresh a token', async () => {
        const getAnyRefreshTokenPermission = await RefreshTokenModel.find();

        const getResponse = await refreshTokenPostRoute(refreshTokenURLRoute, getAnyRefreshTokenPermission[0]._id);

        expect(getResponse.statusCode).toBe(200);
    });

    it('Should be NOT possible to refresh a token', async () => {
        const getResponse = await refreshTokenPostRoute(refreshTokenURLRoute, 'any_id');

        expect(getResponse.statusCode).toBe(401);
    });

});