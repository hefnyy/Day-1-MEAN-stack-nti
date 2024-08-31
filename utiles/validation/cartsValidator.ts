import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleWare from "../../middlewares/validators";

export const addProductToCartValidator: RequestHandler[] = [
  check('product')
    .notEmpty().withMessage('Product required')
    .isMongoId().withMessage('Invalid mongo id'),
  validatorMiddleWare
]

export const removeProductFromCartValidator: RequestHandler[] = [
  check('itemId').isMongoId().withMessage('Invalid mongo id'),
    validatorMiddleWare

]

export const updateProductQuantityValidator: RequestHandler[] = [
  check('itemId').isMongoId().withMessage('Invalid mongo id'),
  check('quantity')
    .notEmpty().withMessage('Quantity required')
    .isNumeric().withMessage('Quantity must be number').toInt()
    .custom((val: number) => {
      if (val <= 0) {
        throw new Error('Invalid quantity')
      }
      return true;
    }),
    validatorMiddleWare

]