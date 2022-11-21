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