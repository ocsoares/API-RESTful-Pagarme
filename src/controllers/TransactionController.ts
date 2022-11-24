import { Request, Response, NextFunction } from 'express';
import { ITransaction } from '../@types/interfaces';
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

        console.log({
            value,
            description,
            payment_method,
            card_number,
            card_holder,
            card_expiration_date,
            cvv
        });

        return res.status(200);
    }
}