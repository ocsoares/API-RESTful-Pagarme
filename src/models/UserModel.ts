import mongoose, { Schema } from "mongoose";
import { IUserModel } from "../@types/interfaces";

export const UserModel = mongoose.model('user', new Schema<IUserModel>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},
    {
        timestamps: true
    }
));