import 'dotenv/config';
import { cleanTestDBConnection } from "../../config/database";
import { TransactionModel } from '../../models/TransactionModel';
import { TransactionUtils } from "../../utils/TransactionUtils";

afterAll(async () => {
    await cleanTestDBConnection();
});

const expectWrongMessage = 'ID de transferência inválido !';
const TEST_CARD_LAST_FOR_DIGITS = process.env.TEST_CARD_LAST_FOR_DIGITS as string;

// Transfer account NEED to exist !!!
const searchTestTransferAccount = async () => {
    const searchTransferAccount = await TransactionModel.findOne({
        card_number: TEST_CARD_LAST_FOR_DIGITS
    });

    return searchTransferAccount;
};

describe('Transaction Utils Unit Test', () => {

    it('Should be possible to generate a new payable credit card', async () => {
        const getTransferAccount = await searchTestTransferAccount();

        const payableCreditCard = await TransactionUtils.savePayableCreditCard(getTransferAccount!.id);

        expect(payableCreditCard).toHaveProperty('id');
    });

    it('Should NOT be possible to generate a new payable credit card', async () => {
        expect.assertions(1); // Precisa disso em try/catch ??
        try {
            await TransactionUtils.savePayableCreditCard('any_wrong_id');
        }
        catch (error: any) {
            expect(error.message).toEqual(expectWrongMessage);
        }
    });

    // COMITAR !!!
    it('Should be possible to generate a new payable debit card', async () => {
        const getTransferAccount = await searchTestTransferAccount();

        const payableDebitCard = await TransactionUtils.savePayableDebitCard(getTransferAccount!.id);

        expect(payableDebitCard).toHaveProperty('id');
    });

    it('Should NOT be possible to generate a new debit card', async () => {
        try {
            await TransactionUtils.savePayableDebitCard('any_wrong_id');
        }
        catch (error: any) {
            console.log('debit...', error.message);
            expect(error.message).toEqual(expectWrongMessage);
        }
    });

});