export interface IUserModel {
    username: string;
    password: string;
}

export interface IUserAccount {
    _id: string;
    username: string;
    password: string;
    confirm_password?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ITransaction {
    transfer_amount: number;
    description: string;
    payment_method: 'debit_card' | 'credit_card';
    card_number: string;
    card_holder: string;
    card_expiration_date: string;
    cvv?: number;
}

export interface IPayableModel {
    transfer_amount: number;
    status: 'paid' | 'waiting_funds';
    payment_date: Date;
    idTransfer: string;
}

export interface IBalanceModel {
    available: string[];
    waiting_funds: string[];
}