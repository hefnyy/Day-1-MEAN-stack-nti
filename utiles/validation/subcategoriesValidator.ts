import { RequestHandler } from "express";
import { check } from "express-validator";
import categoriesModel from "../../Models/categoriesModel";
import validatorMiddleWare from "../../middlewares/validators";


export const createSubcategoryValidator: RequestHandler[] = [
  check('name')
    .notEmpty().withMessage('Subcategory Name is Required')
    .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50'),
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

export const updateSubcategoryValidator: RequestHandler[] = [
  check('name').optional()
    .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50'),
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

export const getSubcategoryValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage('Invalid Mongo Id'),
  validatorMiddleWare
]

export const deleteSubcategoryValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage('Invalid Mongo Id'),
  validatorMiddleWare
]