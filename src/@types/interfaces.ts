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

export interface IJWT {
    id: string;
    username: string;
    iat: number;
    exp: number;
}

export interface ITransaction {
    account_id: string;
    transfer_amount: number;
    description: string;
    payment_method: 'debit_card' | 'credit_card';
    card_number: string;
    card_holder: string;
    card_expiration_date: string;
    cvv?: number;
}

export interface IPayableModel {
    account_id: string;
    transfer_amount: number;
    description: string;
    status: 'paid' | 'waiting_funds';
    payment_date: Date;
    transfer_id: string;
}

// SE PA Apagar !!!!!!!! <<<<<<
export interface IBalanceModel {
    available: string[];
    waiting_funds: string[];
}

export interface IMainTransferInformation {
    transfer_amount: number;
    transfer_date: string;
    description: string;
    payment_method: string;
    card_number: string;
    card_holder: string;
    card_expiration_date: string;
}

export interface IMainInformationOfAccountTransactions {
    transfer_amount: number;
    payment_date: string;
    description: string;
    status: string;
}