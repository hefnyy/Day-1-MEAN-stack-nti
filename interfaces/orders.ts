import { Document } from "mongoose";
import { CartProducts } from "./carts";
import { Users } from "./users";

type Payment = 'cash'|'card';

export interface Orders extends Document{
    cartItems:CartProducts;
    totalPrice:number;
    deliveryFees:number;
    deliveredAt:Date|number;
    isDelivered:boolean;
    paidAt: Date|number;
    isPaid:boolean;
    paymentMethod:Payment;
    user:Users;
    address:string;
}
