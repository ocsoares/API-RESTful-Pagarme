import { Request, Response, NextFunction } from 'express';
import { ITransaction } from '../@types/interfaces';
import { TransactionModel } from '../models/TransactionModel';
import { staticInterfaceMethods } from '../utils/staticInterfaceMethodsUtils';

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

        // const newTransfer = new TransactionModel({
        //     value,
        //     description,
        //     payment_method,
        //     card_number: lastForDigitsCard,
        //     card_holder,
        //     card_expiration_date, // NÃO sei se devo armazenar isso, ou armazenar e ENCRIPTAR... !! <<
        // });

        // await newTransfer.save();

        return res.json({
            message: 'Transation done !',
            // newTransfer
        });
    }
}