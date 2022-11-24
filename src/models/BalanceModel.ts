import mongoose, { Schema } from "mongoose";
import { IBalanceModel } from "../@types/interfaces";

export const BalanceModel = mongoose.model('balance', new Schema<IBalanceModel>({
    available: { type: [String], required: true },
    waiting_funds: { type: [String], required: true }
},
    {
        timestamps: true
    }
));