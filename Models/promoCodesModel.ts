import { Schema, model } from "mongoose";
import {  PromoCodes } from '../interfaces/promoCodes';

const promoCodesModel: Schema = new Schema<PromoCodes>({
  name: { type: String, required: true, trim: true, unique: true },
  expireTime: { type: Date, required: true },
  discount: { type: Number, required: true, min: 1, max: 100 },
}, { timestamps: true });

export default model<PromoCodes>('promocodes', promoCodesModel)