import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleWare from "../../middlewares/validators";

export const addProductToCartValidator: RequestHandler[] = [
  check('product')
    .notEmpty().withMessage((val, { req }) => req.__('prod_required'))
    .isMongoId().withMessage((val, { req }) => req.__('check_id')),
  validatorMiddleWare
]

export const removeProductFromCartValidator: RequestHandler[] = [
  check('itemId').isMongoId().withMessage((val, { req }) => req.__('check_id')),
    validatorMiddleWare

]

export const updateProductQuantityValidator: RequestHandler[] = [
  check('itemId').isMongoId().withMessage((val, { req }) => req.__('check_id')),
  check('quantity')
    .notEmpty().withMessage((val, { req }) => req.__('quant_required'))
    .isNumeric().withMessage((val, { req }) => req.__('quant_num')).toInt()
    .custom((val: number) => {
      if (val <= 0) {
        throw new Error('Invalid quantity')
      }
      return true;
    }),
    validatorMiddleWare

]