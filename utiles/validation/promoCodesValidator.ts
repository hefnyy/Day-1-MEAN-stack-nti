import { RequestHandler } from "express";
import { check } from "express-validator";
import promoCodesModel from "../../Models/promoCodesModel";
import validatorMiddleWare from "../../middlewares/validators";

export const createPromoCodeValidator: RequestHandler[] = [
  check('name')
    .notEmpty().withMessage((val, { req }) => req.__('promo_req'))
    .custom(async (val: string) => {
      const coupon = await promoCodesModel.findOne({ name: val });
      if (coupon) { throw new Error('This Promo Code name is already exist') }
      return true;
    }),
  check('expireTime')
    .notEmpty().withMessage((val, { req }) => req.__('promo_expire_req'))
    .isDate().withMessage((val, { req }) => req.__('invalid_date')),
  check('discount')
    .notEmpty().withMessage((val, { req }) => req.__('disc_req'))
    .isNumeric().withMessage((val, { req }) => req.__('disc_num'))
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
    .isDate().withMessage((val, { req }) => req.__('invalid_date')),
  check('discount')
    .notEmpty().withMessage((val, { req }) => req.__('disc_req'))
    .isNumeric().withMessage((val, { req }) => req.__('disc_num'))
    .custom((val) => {
      if (val <= 0 || val > 100) {
        throw new Error('Invalid Discount value')
      }
      return true;
    }),
  validatorMiddleWare
]

export const getPromoCodeValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage((val, { req }) => req.__('check_id')),
  validatorMiddleWare
]

export const deletePromoCodeValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage((val, { req }) => req.__('check_id')),
  validatorMiddleWare
]