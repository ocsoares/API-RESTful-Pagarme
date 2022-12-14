import { Request, Response } from 'express';
import { IMainTransferInformation, ITransaction } from '../@types/interfaces';
import { TransactionModel } from '../models/TransactionModel';
import { staticInterfaceMethods } from '../utils/staticInterfaceMethodsUtils';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import Logger from '../config/logs';
import { TransactionUtils } from '../utils/TransactionUtils';

interface ITransactionMethods {
    transfer(req: Request, res: Response): Promise<Response>;
    showAllAccountTransactions(req: Request, res: Response): Promise<Response>;
    showAllCreditCardTransactions(req: Request, res: Response): Promise<Response>;
    showAllDebitCardTransactions(req: Request, res: Response): Promise<Response>;
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

        const fixTransferAmountTwoDecimalPlaces = Number(transfer_amount.toFixed(2));
        const lastForDigitsCard = card_number.slice(12, 16);
        const hashCardHolder = await bcrypt.hash(card_holder, 10);
        const hashCardExpirationDate = await bcrypt.hash(card_expiration_date, 10);

        const newTransfer = new TransactionModel({
            account_id: id,
            transfer_amount: fixTransferAmountTwoDecimalPlaces,
            description,
            payment_method,
            card_number: lastForDigitsCard,
            card_holder: hashCardHolder,
            card_expiration_date: hashCardExpirationDate
        });

        await newTransfer.save();

        const mainTransferInformation: IMainTransferInformation = {
            transfer_amount: newTransfer.transfer_amount,
            transfer_date: new Date().toLocaleString('pt-BR'),
            description: newTransfer.description,
            payment_method: newTransfer.payment_method,
            card_number: newTransfer.card_number,
            card_holder: newTransfer.card_holder,
            card_expiration_date: newTransfer.card_expiration_date
        };

        Logger.info(`Transa????o realizada com o cart??o de final ${lastForDigitsCard} !`);


        if (newTransfer.payment_method === 'credit_card') {
            await TransactionUtils.saveCreditCardBillPayable(newTransfer.id);
        }
        else {
            await TransactionUtils.saveDebitCardBillPayable(newTransfer.id);
        }

        return res.status(StatusCodes.ACCEPTED).json({
            message: 'Transation done !',
            new_transfer: mainTransferInformation
        });
    }

    static async showAllAccountTransactions(req: Request, res: Response): Promise<Response> {
        const { id } = req.JWT;

        const showAllAccountTransactions = await TransactionUtils.getAllAccountTransactions(id);

        return res.json({
            message: 'Your transactions have been found !',
            transactions: showAllAccountTransactions
        });
    }

    static async showAllCreditCardTransactions(req: Request, res: Response): Promise<Response> {
        const { id } = req.JWT;

        const showAllAccountTransactions = await TransactionUtils.getAllCreditCardTransactions(id);

        return res.json({
            message: 'Your credit card transactions have been found ! ',
            transactions: showAllAccountTransactions
        });
    }

    static async showAllDebitCardTransactions(req: Request, res: Response): Promise<Response> {
        const { id } = req.JWT;

        const showAllDebitCardTransactions = await TransactionUtils.getAllDebitCardTransactions(id);

        return res.json({
            message: 'Your debit card transactions have been found !',
            transactions: showAllDebitCardTransactions
        });
    }
}