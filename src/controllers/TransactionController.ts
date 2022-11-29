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
            value,
            description,
            payment_method,
            card_number,
            card_holder,
            card_expiration_date,
            cvv
        }: ITransaction = req.body;

        const lastForDigitsCard = card_number.slice(12, 16);
        const hashCardHolder = await bcrypt.hash(card_holder, 10);
        const hashCardExpirationDate = await bcrypt.hash(card_expiration_date, 10);

        const newTransfer = new TransactionModel({
            value,
            description,
            payment_method,
            card_number: lastForDigitsCard,
            card_holder: hashCardHolder,
            card_expiration_date: hashCardExpirationDate
        });

        await newTransfer.save();

        console.log('ID SEM _:', newTransfer.id);
        console.log('ID com _:', newTransfer._id);

        Logger.info(`Transação realizada com o cartão de final ${lastForDigitsCard} !`);

        if (newTransfer.payment_method === 'credit_card') {
            const newPayableCreditCard = await TransactionUtils.savePayableCreditCard(
                newTransfer.id
            );

            console.log('PAYABLE CREDIT:', newPayableCreditCard);
        }
        else {
            const newPayableDebitCard = await TransactionUtils.savePayableDebitCard(
                newTransfer.id
            );

            console.log('PAYABLE DEBIT:', newPayableDebitCard);
        }

        return res.status(StatusCodes.ACCEPTED).json({
            message: 'Transation done !',
            newTransfer
        });
    }
}