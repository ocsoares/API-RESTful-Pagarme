import { body } from "express-validator";

export const transactionValidation = () => {
    return [
        body('value').not().isString().withMessage('Insira um valor válido no formato float !')
            .isFloat({ min: 0.01 }).withMessage('Insira um valor válido no formato float maior que 0.00 !'),

        body('description').isString().withMessage('Insira uma description válida no formato string !'),

        body('payment_method').isString().isIn(['debit_card', 'credit_card']).
            withMessage('Insira um payment_method válido no formato string entre debit_card ou credit_card !'),

        body('card_number').isString().withMessage('Insira um card_number válido no formato string !')
            .isCreditCard().withMessage('Insira um card_number válido !'),

        body('card_holder').isString().withMessage('Insira um card_holder válido no formato string !'),

        // CUSTOMIZAR ESSE Erro, para encontrar no MÁXIMO UMA Barra (/) !! <<
        body('card_expiration_date').isString().withMessage('Insira um card_expiration_date válido no formato string !')
            .isLength({ min: 5, max: 5 }).withMessage('Insira um card_expiration_date válido no formáto mm/aa !'),

        body('cvv').not().isString().withMessage('Insira um cvv válido no formato int !')
            .isInt().isLength({ min: 3, max: 3 }).withMessage('Insira um cvv válido no formato int com no mínimo 3 caracteres !')
    ];
};