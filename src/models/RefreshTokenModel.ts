import mongoose, { Schema } from "mongoose";
import { IRefreshTokenModel } from "../@types/interfaces";

export const RefreshTokenModel = mongoose.model('refresh_token', new Schema<IRefreshTokenModel>({
    account_id: { type: String, required: true, unique: true }
},
    {
        timestamps: true
    }
));