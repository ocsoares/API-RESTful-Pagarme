import 'dotenv/config';
import { cleanTestDBConnection } from "../../config/database";
import { TransactionModel } from '../../models/TransactionModel';
import { TransactionUtils } from "../../utils/TransactionUtils";

afterAll(async () => {
    await cleanTestDBConnection();
});

const expectIDWrongMessage = 'ID de transferência inválido !';
const TEST_CARD_LAST_FOR_DIGITS = process.env.TEST_CARD_LAST_FOR_DIGITS as string;

// Transfer account NEED to exist !!!
const searchTestTransferAccount = async () => {
    const searchTransferAccount = await TransactionModel.findOne({
        card_number: TEST_CARD_LAST_FOR_DIGITS
    });

    return searchTransferAccount;
};

describe('Transaction Utils Unit Test', () => {

    it('Should be possible to generate a new credit card bill payable', async () => {
        const getTransferAccount = await searchTestTransferAccount();

        const creditCardBillPayable = await TransactionUtils.saveCreditCardBillPayable(getTransferAccount!.id);

        expect(creditCardBillPayable).toHaveProperty('id');
    });

    it('Should NOT be possible to generate a new credit card bill payable', async () => {
        expect.assertions(1); // Precisa disso em try/catch ??
        try {
            await TransactionUtils.saveCreditCardBillPayable('any_wrong_id');
        }
        catch (error: any) {
            expect(error.message).toEqual(expectIDWrongMessage);
        }
    });

    it('Should be possible to generate a new debit card bill payable', async () => {
        const getTransferAccount = await searchTestTransferAccount();

        const debitCardBillPayable = await TransactionUtils.saveDebitCardBillPayable(getTransferAccount!.id);

        expect(debitCardBillPayable).toHaveProperty('id');
    });

    it('Should NOT be possible to generate a new debit card bill payable', async () => {
        expect.assertions(1);
        try {
            await TransactionUtils.saveDebitCardBillPayable('any_wrong_id');
        }
        catch (error: any) {
            expect(error.message).toEqual(expectIDWrongMessage);
        }
    });

});