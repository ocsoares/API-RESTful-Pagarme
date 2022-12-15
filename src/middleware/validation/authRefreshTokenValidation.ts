import { body } from "express-validator";

export const authRefreshTokenValidation = () => {
    return [
        body('refresh_token_permission').isString().withMessage('Insira um refresh_token_permission válido no formato string !')
    ];
};