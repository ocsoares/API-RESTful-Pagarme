import mongoose, { Schema } from "mongoose";
import { IPayableModel } from "../@types/interfaces";

export const PayableModel = mongoose.model('payables', new Schema<IPayableModel>({
    account_id: { type: String, required: true, unique: true },
    transfer_amount: { type: Number, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    payment_date: { type: Date, required: true },
    transfer_id: { type: String, required: true }
},
    {
        timestamps: true
    }
));