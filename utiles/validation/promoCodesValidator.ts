import { RequestHandler } from "express";
import { check } from "express-validator";
import promoCodesModel from "../../Models/promoCodesModel";
import validatorMiddleWare from "../../middlewares/validators";

export const createPromoCodeValidator: RequestHandler[] = [
  check('name')
    .notEmpty().withMessage('Promo Code Name is Required')
    .custom(async (val: string) => {
      const coupon = await promoCodesModel.findOne({ name: val });
      if (coupon) { throw new Error('This Promo Code name is already exist') }
      return true;
    }),
  check('expireTime')
    .notEmpty().withMessage('Promo Code expire time required')
    .isDate().withMessage('Invalid Date'),
  check('discount')
    .notEmpty().withMessage('Discount required')
    .isNumeric().withMessage('Discount must be a number')
    .custom((val) => {
      if (val <= 0 || val > 100) {
        throw new Error('Invalid Discount value')
      }
      return true;
    }),
  validatorMiddleWare
]

export const updatePromoCodeValidator: RequestHandler[] = [
  check('name').optional(),
  check('expireTime').optional()
    .isDate().withMessage('Invalid Date'),
  check('discount')
    .notEmpty().withMessage('Discount required')
    .isNumeric().withMessage('Discount must be a number')
    .custom((val) => {
      if (val <= 0 || val > 100) {
        throw new Error('Invalid Discount value')
      }
      return true;
    }),
  validatorMiddleWare
]

export const getPromoCodeValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage('Invalid Mongo Id'),
  validatorMiddleWare
]

export const deletePromoCodeValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage('Invalid Mongo Id'),
  validatorMiddleWare
]