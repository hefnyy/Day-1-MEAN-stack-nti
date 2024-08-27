import { validationResult } from "express-validator";
import { Request,Response,NextFunction,RequestHandler } from "express";

const validatorMiddleWare:RequestHandler = (req:Request,res:Response,next:NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});

    } else{
        next();
    }
    
};

export default validatorMiddleWare;