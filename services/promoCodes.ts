import { NextFunction, Request, Response } from "express";
import { PromoCodes } from "../interfaces/promoCodes";
import promoCodesModel from "../Models/promoCodesModel";
import usersModel from "../Models/usersModel";
import { createOne, getAll, getOne, removeOne, updateOne } from "./refactorsHandler";
import  asyncHandler  from 'express-async-handler';
import ApiErrors from "../utiles/APIErrors";
import sendEmail from "../utiles/sendEmail";

export const createPromoCode = createOne<PromoCodes>(promoCodesModel)
export const getAllPromoCodes = getAll<PromoCodes>(promoCodesModel, 'coupons')
export const getPromoCode = getOne<PromoCodes>(promoCodesModel)
export const updatePromoCode = updateOne<PromoCodes>(promoCodesModel)
export const deletePromoCode = removeOne<PromoCodes>(promoCodesModel)

export const sendPromoCodeEmail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await usersModel.findOne({email:req.body.email})
    if(!user){
      return next(new ApiErrors('Email not found',404));
    }
    const promoCode = await promoCodesModel.findById(req.body.promoCode);    
    if(!promoCode){
        return next(new ApiErrors('Promo Code not found',404));
      }
    const promoCodeName = promoCode.name; 
    try {
        await sendEmail({email: user.email , subject:'Promo Code',message:`Your Promo Code is {${promoCodeName}} you can use it until ${promoCode.expireTime} and get discount of ${promoCode.discount}%`});
        await user.save({ validateModifiedOnly: true });
    }
    catch(err){
      console.log(err);
      return next(new ApiErrors('Error while sending the Email',400));
    }
    
    res.status(200).json({message: `Promo Code has been sent to ${user.email}`,promoCodeName})
  });
