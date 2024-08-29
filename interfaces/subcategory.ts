import { Document } from "mongoose";
import { Schema } from "mongoose";

export interface Subcategory extends Document{
    name: string;
    category:Schema.Types.ObjectId;
    subcategoryImage: string;
}