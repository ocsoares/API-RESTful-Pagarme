import mongoose, { Schema } from "mongoose";
import { ITransaction } from "../@types/interfaces";

export const TransactionModel = mongoose.model('transactions', new Schema<ITransaction>({
    value: { type: Number, required: true },
    description: { type: String, required: true },
    payment_method: { type: String, required: true },
    card_number: { type: String, required: true, unique: true },
    card_holder: { type: String, required: true },
    card_expiration_date: { type: String, required: true },
},
    {
        timestamps: true
    }
));