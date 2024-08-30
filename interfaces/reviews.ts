import { Document } from "mongoose";
import { Users } from "./users";
import { Products } from "./Products";

export interface Reviews extends Document{
    comment: SVGStringList;
    rating: number;
    user: Users;
    product: Products;
};