import mongoose, { Schema } from "mongoose";
import { IPayableModel } from "../@types/interfaces";

export const PayableModel = mongoose.model('payables', new Schema<IPayableModel>({
    status: { type: String, required: true },
    payment_date: { type: String, required: true }
},
    {
        timestamps: true
    }
));