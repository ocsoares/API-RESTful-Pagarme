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
    value: number;
    description: string;
    payment_method: 'debit_card' | 'credit_card';
    card_number: string;
    card_holder: string;
    card_expiration_date: string;
    cvv: number;
}

export interface IPayableModel {
    status: string;
    payment_date: string;
}

export interface IBalanceModel {
    available: string[];
    waiting_funds: string[];
}