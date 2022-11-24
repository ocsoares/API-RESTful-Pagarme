import { body } from "express-validator";

export const transactionValidation = () => {
    return [
        body('value').isFloat({ min: 1 }).withMessage('Insira um valor válido no formato float !'),
        body('description').isString().withMessage('Insira uma description válida no formato string !'),
        body('payment_method').isString().withMessage('Insira um payment_method válido no formato string !'),
        body('card_number').isString().withMessage('Insira um card_number válido no formato string !'),
        body('card_holder').isString().withMessage('Insira um card_holder válido no formato string !'),
        body('card_expiration_date').isString().withMessage('Insira um card_expiration_date válido no formato string !'),
        body('cvv').isInt().isLength({ min: 3 }).withMessage('Insira um cvv válido no formato string !')
    ];
};