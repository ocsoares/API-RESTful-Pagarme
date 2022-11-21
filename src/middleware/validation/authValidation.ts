import { body } from 'express-validator';

export const authRegisterValidation = () => {
    return [
        body('username').isString().withMessage('Insira um username válido no formato string !')
            .isLength({ min: 5 }).withMessage('Insira um username com 5 ou mais caracteres !'),

        body('password').isString().withMessage('Insira um password válido no formato string !')
            .isLength({ min: 7 }).withMessage('Insira um password com 7 ou mais caracteres !'),

        body('confirm_password').isString().withMessage('Insira o confirm_password válido no formato string !')
    ];
};

export const authLoginValidation = () => {
    return [
        body('username').isString().withMessage('Insira um username válido no formato string !'),
        body('password').isString().withMessage('Insira um password válido no formato string !')
    ];
};