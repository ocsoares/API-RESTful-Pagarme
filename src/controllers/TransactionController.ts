import { Request, Response, NextFunction } from 'express';
import { ITransaction } from '../@types/interfaces';
import { TransactionModel } from '../models/TransactionModel';
import { staticInterfaceMethods } from '../utils/staticInterfaceMethodsUtils';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import Logger from '../config/logs';
import { TransactionUtils } from '../utils/TransactionUtils';

interface ITransactionMethods {
    transfer(req: Request, res: Response): Promise<Response>;
}

@staticInterfaceMethods<ITransactionMethods>()
export class TransactionController {
    static async transfer(req: Request, res: Response): Promise<Response> {
        const {
            transfer_amount,
            description,
            payment_method,
            card_number,
            card_holder,
            card_expiration_date,
            cvv
        }: ITransaction = req.body;

        const { id } = req.JWT;

        const lastForDigitsCard = card_number.slice(12, 16);
        const hashCardHolder = await bcrypt.hash(card_holder, 10);
        const hashCardExpirationDate = await bcrypt.hash(card_expiration_date, 10);

        const newTransfer = new TransactionModel({
            id_account: id,
            transfer_amount,
            description,
            payment_method,
            card_number: lastForDigitsCard,
            card_holder: hashCardHolder,
            card_expiration_date: hashCardExpirationDate
        });

        await newTransfer.save();

        Logger.info(`Transação realizada com o cartão de final ${lastForDigitsCard} !`);

        if (newTransfer.payment_method === 'credit_card') {
            await TransactionUtils.saveCreditCardBillPayable(newTransfer.id);
        }
        else {
            await TransactionUtils.saveDebitCardBillPayable(newTransfer.id);
        }

        return res.status(StatusCodes.ACCEPTED).json({
            message: 'Transation done !',
            newTransfer
        });
    }
}