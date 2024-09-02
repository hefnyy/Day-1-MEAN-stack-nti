import { RequestHandler } from "express";
import { check } from "express-validator";
import categoriesModel from "../../Models/categoriesModel";
import validatorMiddleWare from "../../middlewares/validators";


export const createProductValidator: RequestHandler[] = [
  check('name')
    .notEmpty().withMessage((val, { req }) => req.__('prod_name'))
    .isLength({ min: 2, max: 50 }).withMessage((val, { req }) => req.__('name_length')),

    check('description').optional()
    .notEmpty().withMessage((val, { req }) => req.__('prod_desc'))
    .isLength({min:15,max:500}),

    check('price')
    .notEmpty().withMessage((val, { req }) => req.__('prod_price')).toFloat()
    .custom((val: number) => {
      if (val <= 0 || val > 1000000) {
        throw new Error('Invalid Price')
      }
      return true
    }),

    check('priceAfterDisc').optional()
    .isNumeric().withMessage((val, { req }) => req.__('price_num')).toFloat()
    .custom((val: number) => {
      if (val <= 0 || val > 1000000) {
        throw new Error('Invalid Price')
      }
      return true
    }),

  check('quantity').optional()
    .isNumeric().withMessage((val, { req }) => req.__('quant_num')).toInt()
    .custom((val: number) => {
      if (val < 0) {
        throw new Error('Invalid Quantity')
      }
      return true
    }),

  check('category')
    .notEmpty().withMessage((val, { req }) => req.__('category_req'))
    .isMongoId().withMessage((val, { req }) => req.__('check_id'))
    .custom(async (val) => {
      const category = await categoriesModel.findById(val);
      if (!category) {
        throw new Error('Category Not Found');
      }
      return true;
    }),
    validatorMiddleWare
]

export const updateProductValidator: RequestHandler[] = [
  check('name').optional()
    .isLength({ min: 2, max: 50 }).withMessage((val, { req }) => req.__('name_length')),

  check('description').optional()
    .isLength({ min: 15, max: 500 }),

  check('price').optional()
    .isNumeric().withMessage((val, { req }) => req.__('price_num')).toFloat()
    .custom((val: number) => {
      if (val <= 0 || val > 1000000) {
        throw new Error('Invalid Price')
      }
      return true
    }),

  check('priceAfterDisc').optional()
    .isNumeric().withMessage((val, { req }) => req.__('price_num')).toFloat()
    .custom((val: number) => {
      if (val <= 0 || val > 1000000) {
        throw new Error('Invalid Price')
      }
      return true
    }),
    
  check('quantity').optional()
    .isNumeric().withMessage((val, { req }) => req.__('quant_num')).toInt()
    .custom((val: number) => {
      if (val < 0) {
        throw new Error('Invalid Quantity')
      }
      return true
    }),
    
  check('category').optional()
    .isMongoId().withMessage((val, { req }) => req.__('check_id'))
    .custom(async (val) => {
      const category = await categoriesModel.findById(val);
      if (!category) {
        throw new Error('Category Not Found');
      }
      return true;
    }),
    validatorMiddleWare
]


export const getProductValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage((val, { req }) => req.__('check_id')),
  validatorMiddleWare
]

export const deleteProductValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage((val, { req }) => req.__('check_id')),
  validatorMiddleWare
]