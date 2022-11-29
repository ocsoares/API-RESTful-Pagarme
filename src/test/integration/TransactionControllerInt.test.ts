import 'dotenv/config';
import request from 'supertest';
import { ITransaction } from '../../@types/interfaces';
import { app } from '../../app';

const transactionPost = async (
    urlRoute: string,
    value: number,
    description: string,
    payment_method: 'debit_card' | 'credit_card',
    card_number: string,
    card_holder: string,
    card_expiration_date: string,
    cvv: number
): Promise<request.Response> => {
    const getResponse = await request(app).post(urlRoute)
        .set('Authorization', `Bearer ${process.env.JWT_NOT_EXPIRE}`)
        .send(<ITransaction>{
            value,
            description,
            payment_method,
            card_number,
            card_holder,
            card_expiration_date,
            cvv
        });

    return getResponse;
};

const transactionURLRoute = '/api/transaction';
const TEST_CARD_NUMBER = process.env.TEST_CARD_NUMBER as string;
const TEST_CARD_EXPIRATION_DATE = process.env.TEST_CARD_EXPIRATION_DATE as string;
const TEST_CARD_CVV = Number(process.env.TEST_CARD_CVV);

describe('Transaction Controller Integration Test', () => {

    it('Should be possible to make a transaction', async () => {
        const getResponse = await transactionPost(
            transactionURLRoute,
            203.12,
            'Macbook M1X',
            'credit_card',
            TEST_CARD_NUMBER,
            'Matheus Lopes',
            TEST_CARD_EXPIRATION_DATE,
            TEST_CARD_CVV
        );

        expect(getResponse.statusCode).toBe(202);
    });

    it("Should NOT be possible to make a transaction", async () => {
        const getResponse = await transactionPost(
            transactionURLRoute,
            183.00,
            'Dell Alienware GTX 3060ti',
            'debit_card',
            '7483919394938474', // Wrong card !!
            'Welington Ferraz',
            '19/25',
            834
        );

        expect(getResponse.statusCode).toBe(400);
    });
});