import { isValidObjectId } from "mongoose";
import { IMainTransactionInformation, IPayableModel, ITransaction } from "../@types/interfaces";
import Logger from "../config/logs";
import { BadRequestAPIError } from "../helpers/ErrorAPIHelper";
import { PayableModel } from "../models/PayableModel";
import { TransactionModel } from "../models/TransactionModel";
import { staticInterfaceMethods } from '../utils/staticInterfaceMethodsUtils';

interface ITransactionMethods {
    saveCreditCardBillPayable(transfer_id: string): Promise<IPayableModel>;
    saveDebitCardBillPayable(transfer_id: string): Promise<IPayableModel>;
    getAllAccountTransactions(account_id: string): Promise<Array<IMainTransactionInformation>>;
    getAllCreditCardTransactions(account_id: string): Promise<Array<IMainTransactionInformation>>;
    getAllDebitCardTransactions(account_id: string): Promise<Array<IMainTransactionInformation>>;
}

const checkTransferID = async (transfer_id: string): Promise<ITransaction | false> => {
    const searchTransferID = await TransactionModel.findById(transfer_id);

    if (!isValidObjectId(transfer_id)) {
        return false;
    }

    else if (!searchTransferID) {
        return false;
    }

    return searchTransferID;
};

@staticInterfaceMethods<ITransactionMethods>()
export class TransactionUtils {
    static async saveCreditCardBillPayable(transfer_id: string): Promise<IPayableModel> {
        const transferInformation = await checkTransferID(transfer_id);

        if (!transferInformation) {
            throw new BadRequestAPIError('ID de transferência inválido !');
        }

        const currentDate = new Date();
        const currentDateAfterThirtyDays = new Date(currentDate.setDate(currentDate.getDate() + 30));

        const threePercentProcessingFee = Number((transferInformation.transfer_amount
            - (transferInformation.transfer_amount * 0.03)).toFixed(2));

        const newBillPayable = new PayableModel(<IPayableModel>{
            account_id: transferInformation.account_id,
            transfer_amount: threePercentProcessingFee,
            description: transferInformation.description,
            status: 'waiting_funds',
            payment_date: currentDateAfterThirtyDays,
            transfer_id
        });

        await newBillPayable.save();

        Logger.info(
            `Payable no cartão de crédito gerado para a transferência '${newBillPayable.transfer_id}' !`
        );

        return newBillPayable;
    };

    static async saveDebitCardBillPayable(transfer_id: string): Promise<IPayableModel> {
        const transferInformation = await checkTransferID(transfer_id);

        if (!transferInformation) {
            throw new BadRequestAPIError('ID de transferência inválido !');
        }

        const fivePercentProcessingFee = Number((transferInformation.transfer_amount
            - (transferInformation.transfer_amount * 0.05)).toFixed(2));

        const newBillPayable = new PayableModel(<IPayableModel>{
            account_id: transferInformation.account_id,
            transfer_amount: fivePercentProcessingFee,
            description: transferInformation.description,
            status: 'paid',
            payment_date: new Date(),
            transfer_id
        });

        await newBillPayable.save();

        Logger.info(
            `Payable no cartão de débito gerado para a transferência '${newBillPayable.transfer_id}'`
        );

        return newBillPayable;
    };

    // FAZER TESTES !!!!! <<<<<
    static async getAllAccountTransactions(account_id: string): Promise<Array<IMainTransactionInformation>> {
        const getAllAccountTransactions = await PayableModel.find({ account_id });

        const mainAccountTransactionsInformation = getAllAccountTransactions.map(prop => (<IMainTransactionInformation>{
            transfer_amount: prop.transfer_amount,
            payment_date: prop.transfer_amount.toLocaleString('pt-BR'),
            description: prop.description,
            status: prop.status
        }));

        return mainAccountTransactionsInformation;
    }

    // FAZER TESTES !!!! <<<<<
    static async getAllCreditCardTransactions(account_id: string): Promise<Array<IMainTransactionInformation>> {
        const getAllCreditCardTransactions = await PayableModel.find(<IPayableModel>{
            account_id,
            status: 'waiting_funds'
        });

        const mainCreditCardTransactionInformation = getAllCreditCardTransactions.map(prop => (<IMainTransactionInformation>{
            transfer_amount: prop.transfer_amount,
            payment_date: prop.payment_date.toLocaleString('pt-BR'),
            description: prop.description,
            status: prop.status
        }));

        return mainCreditCardTransactionInformation;
    }

    // FAZER TESTES !!!! <<<<<
    static async getAllDebitCardTransactions(account_id: string): Promise<Array<IMainTransactionInformation>> {
        const getAllDebitCardTransactions = await PayableModel.find(<IPayableModel>{
            account_id,
            status: 'paid'
        });

        const mainDebitCardTransactionInformation = getAllDebitCardTransactions.map(prop => (<IMainTransactionInformation>{
            transfer_amount: prop.transfer_amount,
            payment_date: prop.payment_date.toLocaleString('pt-BR'),
            description: prop.description,
            status: prop.status
        }));

        return mainDebitCardTransactionInformation;
    }
}