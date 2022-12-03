import 'dotenv/config';
import { IUserAccount } from '../../@types/interfaces';
import { cleanTestDBConnection } from "../../config/database";
import { TransactionModel } from '../../models/TransactionModel';
import { AuthUtils } from '../../utils/AuthUtils';
import { TransactionUtils } from "../../utils/TransactionUtils";

afterAll(async () => {
    await cleanTestDBConnection();
});

const expectIDWrongMessage = 'ID de transferência inválido !';
const TEST_CARD_LAST_FOR_DIGITS = process.env.TEST_CARD_LAST_FOR_DIGITS as string;
const TEST_USERNAME = process.env.TEST_USERNAME as string;

// This transfer account exists in test database !
const searchTestTransferAccount = async () => {
    const searchTransferAccount = await TransactionModel.findOne({
        card_number: TEST_CARD_LAST_FOR_DIGITS
    });

    return searchTransferAccount;
};

// This user exists in test database !
const searchTestUser = async () => {
    const searchUser = await AuthUtils.searchUserByUsername(TEST_USERNAME) as IUserAccount;

    return searchUser;
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

    it('Should be possible to get all account transactions', async () => {
        const getUser = await searchTestUser();

        const getAllAccountTransactions = await TransactionUtils.getAllAccountTransactions(getUser.id);

        expect(getAllAccountTransactions[0]).toHaveProperty('transfer_amount');
    });

    it('Should NOT be possible to get all account transactions', async () => {
        const getAllAccountTransactions = await TransactionUtils.getAllAccountTransactions('invalid_id');

        expect(getAllAccountTransactions[0]).toBe(undefined);
    });

    it('Should be possible to get all credit card transactions', async () => {
        const getUser = await searchTestUser();

        const getAllCreditCardTransactions = await TransactionUtils.getAllCreditCardTransactions(getUser.id);

        expect(getAllCreditCardTransactions[0].status).toBe('waiting_funds');
    });

    it('Should NOT be possible to get all credit card transactions', async () => {
        const getAllCreditCardTransactions = await TransactionUtils.getAllCreditCardTransactions('invalid_id');

        expect(getAllCreditCardTransactions[0]).toBe(undefined);
    });

    it('Should be possible to get all debit card transactions', async () => {
        const getUser = await searchTestUser();

        const getAllDebitCardTransactions = await TransactionUtils.getAllDebitCardTransactions(getUser.id);

        expect(getAllDebitCardTransactions[0].status).toBe('paid');
    });

    it('Should NOT be possible to get all debit card transactions', async () => {
        const getAllDebitCardTransactions = await TransactionUtils.getAllDebitCardTransactions('invalid_id');

        expect(getAllDebitCardTransactions[0]).toBe(undefined);
    });
});