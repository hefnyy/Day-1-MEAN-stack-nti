import Jwt from "jsonwebtoken";

export const createToken = (payload: any) => Jwt.sign({ _id: payload }, process.env.Jwt_PRIVATE_KEY!, { expiresIn: process.env.JWT_EXPIRED_TIME })