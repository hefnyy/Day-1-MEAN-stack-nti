import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleWare from "../../middlewares/validators";
import subcategoryModel from "../../Models/subcategoryModel";
import { Subcategory } from "../../interfaces/subcategory";
import categoriesModel from "../../Models/categoriesModel";

export const createCategoryValidator: RequestHandler[] = [
  check('name')
    .notEmpty().withMessage((val, { req }) => req.__('category_name'))
    .isLength({ min: 2, max: 50 }).withMessage((val, { req }) => req.__('name_length'))
    .custom(async (val: string) => {
      const category = await categoriesModel.findOne({ name: val });
      if (category) { throw new Error('Category is already exist') };
      return true;
    }),
  validatorMiddleWare
]

export const updateCategoryValidator: RequestHandler[] = [
  check('name')
    .notEmpty().withMessage((val, { req }) => req.__('category_name'))
    .isLength({ min: 2, max: 50 }).withMessage((val, { req }) => req.__('name_length')),
    validatorMiddleWare
]

export const getCategoryValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage((val, { req }) => req.__('check_id')),
  validatorMiddleWare
]

export const deleteCategoryValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage((val, { req }) => req.__('check_id'))
    .custom(async (val) => {
      const subcategories = await subcategoryModel.find({ category: val });
      if (subcategories.length > 0) {

        // * bulkWrite more performance
        const bulkOption = subcategories.map((subcategory: Subcategory) => ({
          deleteOne: { filter: { _id: subcategory._id } }
        }))
        await subcategoryModel.bulkWrite(bulkOption)
      }
      return true;
    }),
    validatorMiddleWare
]