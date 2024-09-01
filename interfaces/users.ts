import { Document } from "mongoose";
import { Products } from "./Products";
// import { Address } from "./addresses";
 
type Role = 'manager' | 'admin' | 'user';

export interface Users extends Document{
    email: string;
    password: string;
    name: string;
    profileImage: string;
    role: Role;
    active: boolean;
    passwordUpdatedAt: Date | number | undefined;
    resetCode: string | undefined;
    resetCodeExpireTime: Date | number | undefined;
    resetCodeVerify: boolean | undefined;
    wishlist:Products[];
    address:string;
    phoneNumber:number;
    // address:Address[];
}