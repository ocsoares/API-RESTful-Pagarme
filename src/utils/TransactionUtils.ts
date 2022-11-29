import { IPayableModel } from "../@types/interfaces";
import { PayableModel } from "../models/PayableModel";
import { staticInterfaceMethods } from '../utils/staticInterfaceMethodsUtils';

// FAZER Testes para isso !!!! <<<<

interface ITransactionMethods {
    savePayableCreditCard(idTransfer: string): Promise<IPayableModel>;
    savePayableDebitCard(idTransfer: string): Promise<IPayableModel>;
}

@staticInterfaceMethods<ITransactionMethods>()
export class TransactionUtils {
    static async savePayableCreditCard(idTransfer: string): Promise<IPayableModel> {
        const newPayable = new PayableModel(<IPayableModel>{
            status: 'paid',
            payment_date: new Date(),
            idTransfer
        });

        await newPayable.save();

        return newPayable;
    };

    static async savePayableDebitCard(idTransfer: string): Promise<IPayableModel> {
        const newPayable = new PayableModel(<IPayableModel>{
            status: 'waiting_funds',
            payment_date: new Date(), // FAZER a data Atual + 30 !!
            idTransfer
        });

        await newPayable.save();

        return newPayable;
    };
}