import { isValidObjectId } from "mongoose";
import { IPayableModel, ITransaction } from "../@types/interfaces";
import Logger from "../config/logs";
import { BadRequestAPIError } from "../helpers/ErrorAPIHelper";
import { PayableModel } from "../models/PayableModel";
import { TransactionModel } from "../models/TransactionModel";
import { staticInterfaceMethods } from '../utils/staticInterfaceMethodsUtils';

interface ITransactionMethods {
    savePayableCreditCard(idTransfer: string): Promise<IPayableModel>;
    savePayableDebitCard(idTransfer: string): Promise<IPayableModel>;
}

const checkTransferID = async (idTransfer: string): Promise<ITransaction | false> => {
    const searchTransferID = await TransactionModel.findById(idTransfer);

    if (!isValidObjectId(idTransfer)) {
        return false;
    }

    else if (!searchTransferID) {
        return false;
    }

    return searchTransferID;
};

@staticInterfaceMethods<ITransactionMethods>()
export class TransactionUtils {
    static async savePayableCreditCard(idTransfer: string): Promise<IPayableModel> {
        const transferInformation = await checkTransferID(idTransfer);

        if (!transferInformation) {
            throw new BadRequestAPIError('ID de transferência inválido !');
        }

        const threePercentProcessingFee = Number((transferInformation.transfer_amount -
            (transferInformation.transfer_amount * 0.03)).toFixed(2));
        console.log('threePerc...', threePercentProcessingFee);

        const newPayable = new PayableModel(<IPayableModel>{
            transfer_amount: threePercentProcessingFee,
            status: 'paid',
            payment_date: new Date(),
            idTransfer
        });

        await newPayable.save();

        Logger.info(
            `Payable no cartão de crédito gerado para a transferência '${newPayable.idTransfer}' !`
        );

        return newPayable;
    };

    static async savePayableDebitCard(idTransfer: string): Promise<IPayableModel> {
        const transferInformation = await checkTransferID(idTransfer);

        if (!transferInformation) {
            throw new BadRequestAPIError('ID de transferência inválido !');
        }

        const currentDate = new Date();
        const dateAfterThirtyDays = new Date(currentDate.setDate(currentDate.getDate() + 30));

        const fivePercentProcessingFee = Number((transferInformation.transfer_amount -
            (transferInformation.transfer_amount * 0.05)).toFixed(2));
        console.log('fivePer..', fivePercentProcessingFee);

        const newPayable = new PayableModel(<IPayableModel>{
            transfer_amount: fivePercentProcessingFee,
            status: 'waiting_funds',
            payment_date: dateAfterThirtyDays,
            idTransfer
        });

        await newPayable.save();

        Logger.info(
            `Payable no cartão de débito gerado para a transferência '${newPayable.idTransfer}'`
        );

        return newPayable;
    };
}