import { Document } from "mongoose";

export interface PromoCodes extends Document {
  name: string;
  expireTime: Date;
  discount: number;
};