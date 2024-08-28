import { RequestHandler } from "express";
import { check } from "express-validator";
import categoriesModel from "../../Models/categoriesModel";
import validatorMiddleWare from "../../middlewares/validators";


export const createProductValidator: RequestHandler[] = [
  check('name')
    .notEmpty().withMessage('Product\' Name is Required')
    .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50'),

    check('description').optional()
    .notEmpty().withMessage('Product\'s description is required' )
    .isLength({min:15,max:500}),

    check('price')
    .notEmpty().withMessage('Product\'s price is required' ).toFloat()
    .custom((val: number) => {
      if (val <= 0 || val > 1000000) {
        throw new Error('Invalid Price')
      }
      return true
    }),

    check('priceAfterDisc').optional()
    .isNumeric().withMessage('Price must be number').toFloat()
    .custom((val: number) => {
      if (val <= 0 || val > 1000000) {
        throw new Error('Invalid Price')
      }
      return true
    }),

  check('quantity').optional()
    .isNumeric().withMessage('Quantity must be number').toInt()
    .custom((val: number) => {
      if (val < 0) {
        throw new Error('Invalid Quantity')
      }
      return true
    }),

  check('category')
    .notEmpty().withMessage('Category is Required')
    .isMongoId().withMessage('Invalid Mongo Id')
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
    .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50'),

  check('description').optional()
    .isLength({ min: 15, max: 500 }),

  check('price').optional()
    .isNumeric().withMessage('Price must be number').toFloat()
    .custom((val: number) => {
      if (val <= 0 || val > 1000000) {
        throw new Error('Invalid Price')
      }
      return true
    }),

  check('priceAfterDisc').optional()
    .isNumeric().withMessage('Price must be number').toFloat()
    .custom((val: number) => {
      if (val <= 0 || val > 1000000) {
        throw new Error('Invalid Price')
      }
      return true
    }),
    
  check('quantity').optional()
    .isNumeric().withMessage('Quantity must be number').toInt()
    .custom((val: number) => {
      if (val < 0) {
        throw new Error('Invalid Quantity')
      }
      return true
    }),
    
  check('category').optional()
    .isMongoId().withMessage('Invalid Mongo Id')
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
  check('id').isMongoId().withMessage('Invalid Mongo Id'),
  validatorMiddleWare
]

export const deleteProductValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage('Invalid Mongo Id'),
  validatorMiddleWare
]