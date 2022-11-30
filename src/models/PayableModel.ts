import mongoose, { Schema } from "mongoose";
import { IPayableModel } from "../@types/interfaces";

export const PayableModel = mongoose.model('payables', new Schema<IPayableModel>({
    transfer_amount: { type: Number, required: true },
    status: { type: String, required: true },
    payment_date: { type: Date, required: true },
    idTransfer: { type: String, required: true }
},
    {
        timestamps: true
    }
));