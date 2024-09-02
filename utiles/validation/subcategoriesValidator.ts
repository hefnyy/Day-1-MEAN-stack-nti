import { RequestHandler } from "express";
import { check } from "express-validator";
import categoriesModel from "../../Models/categoriesModel";
import validatorMiddleWare from "../../middlewares/validators";


export const createSubcategoryValidator: RequestHandler[] = [
  check('name')
    .notEmpty().withMessage((val, { req }) => req.__('sub_name'))
    .isLength({ min: 2, max: 50 }).withMessage((val, { req }) => req.__('name_length')),
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

export const updateSubcategoryValidator: RequestHandler[] = [
  check('name').optional()
    .isLength({ min: 2, max: 50 }).withMessage((val, { req }) => req.__('name_length')),
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

export const getSubcategoryValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage((val, { req }) => req.__('check_id')),
  validatorMiddleWare
]

export const deleteSubcategoryValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage((val, { req }) => req.__('check_id')),
  validatorMiddleWare
]