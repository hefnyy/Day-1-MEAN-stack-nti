import { Document} from "mongoose";
import { Schema } from 'mongoose';

export interface Products extends Document{
    name: string;
    category: Schema.Types.ObjectId;
    Subcategory: Schema.Types.ObjectId;
    description: string;
    price: number;
    priceAfterDisc: number;
    quantity: number;
    sold: number;
    images: string[];
    cover: string;
    ratingAvg: number;
    ratingCount: number; 
}