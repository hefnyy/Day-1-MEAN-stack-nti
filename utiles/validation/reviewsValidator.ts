import { RequestHandler } from "express";
import { check } from "express-validator";
import categoriesModel from "../../Models/categoriesModel";
import validatorMiddleWare from "../../middlewares/validators";
import reviewsModel from "../../Models/reviewsModel";


export const createReviewValidator: RequestHandler[] = [
  check('comment')
    .notEmpty().withMessage((val, { req }) => req.__('comment_req')),
    check('rating')
    .notEmpty().withMessage((val, { req }) => req.__('rate_req')),
    check('user')
    .notEmpty().withMessage((val, { req }) => req.__('user_req'))
    .isMongoId().withMessage((val, { req }) => req.__('check_id')),
  check('product')
    .notEmpty().withMessage((val, { req }) => req.__('prod_req'))
    .isMongoId().withMessage((val, { req }) => req.__('check_id'))
    .custom(async (val,{req}) => {
        const review = await reviewsModel.findOne({user:req.user._id,product:val})
        if(review)
            throw new Error('You already have a review on this product')
        return true;
    }),
    validatorMiddleWare
]

export const updateReviewValidator: RequestHandler[] = [
  check('id')
  .isMongoId().withMessage((val, { req }) => req.__('check_id'))
  .custom(async( val,{req} ) => {
    const review = await reviewsModel.findById(val)
    if(!review)
        throw new Error('Review is not found')
    if(review.user._id!.toString() !== req.user._id.toString() )
        throw new Error('You are not the Owner of this Review')
    return true
  }),
    validatorMiddleWare
]

export const getReviewValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage((val, { req }) => req.__('check_id')),
  validatorMiddleWare
]

export const deleteReviewValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage((val, { req }) => req.__('check_id'))
  .custom(async( val,{req} ) => {
    if (req.user.role === 'user'){
        const review = await reviewsModel.findById(val)
        if(!review)
            throw new Error('Review is not found')
        if(review.user._id!.toString() !== req.user._id.toString() )
            throw new Error('You are not the Owner of this Review')
    }
    return true
  }),
  validatorMiddleWare
]