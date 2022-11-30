import 'dotenv/config';
import { StatusCodes } from 'http-status-codes';
import { cleanTestDBConnection } from "../../config/database";
import { BadRequestAPIError } from '../../helpers/ErrorAPIHelper';
import { TransactionModel } from '../../models/TransactionModel';
import { TransactionUtils } from "../../utils/TransactionUtils";

afterAll(async () => {
    await cleanTestDBConnection();
});

const TEST_CARD_LAST_FOR_DIGITS = process.env.TEST_CARD_LAST_FOR_DIGITS as string;

// Transfer account NEED to exist !!!
const searchTransferAccount = async () => {
    const searchTransferAccount = await TransactionModel.findOne({
        card_number: TEST_CARD_LAST_FOR_DIGITS
    });

    return searchTransferAccount;
};

// QUANDO ACABAR ISSO, fazer COMMIT !!
describe('Transaction Utils Unit Test', () => {

    it('Should be possible to generate a new payable credit card', async () => {
        const getTransferAccount = await searchTransferAccount();

        const payableCreditCard = await TransactionUtils.savePayableCreditCard(getTransferAccount!.id);

        expect(payableCreditCard).toHaveProperty('id');
    });

    it('Should NOT be possible to generate a new payable credit card', async () => {
        expect.assertions(1); // Precisa disso em try/catch ??
        try {
            await TransactionUtils.savePayableCreditCard('any_wrong_id');
        }
        catch (error: any) {
            expect(error.message).toEqual('ID de transferência inválido !');
        }
    });

});