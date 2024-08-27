import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleWare from "../../middlewares/validators";
import subcategoryModel from "../../Models/subcategoryModel";
import { Subcategory } from "../../interfaces/subcategory";

export const createCategoryValidator: RequestHandler[] = [
  check('name')
    .notEmpty().withMessage('Category Name is Required')
    .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50'),
  validatorMiddleWare
]

export const updateCategoryValidator: RequestHandler[] = [
  check('name')
    .notEmpty().withMessage('Category Name is Required')
    .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50'),
    validatorMiddleWare
]

export const getCategoryValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage('Invalid Mongo Id'),
  validatorMiddleWare
]

export const deleteCategoryValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage('Invalid Mongo Id')
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