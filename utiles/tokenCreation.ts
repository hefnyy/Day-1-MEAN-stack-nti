import Jwt from "jsonwebtoken";

export const createToken = (payload: any,role:string) => Jwt.sign({ _id: payload,role:role }, process.env.Jwt_PRIVATE_KEY!, { expiresIn: process.env.JWT_EXPIRED_TIME })

export const createResetToken = (payload: any) => Jwt.sign({ _id: payload }, process.env.Jwt_PRIVATE_KEY!, { expiresIn: process.env.JWT_EXPIRED_RESET_CODE_TIME })