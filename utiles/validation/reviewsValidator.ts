import { RequestHandler } from "express";
import { check } from "express-validator";
import categoriesModel from "../../Models/categoriesModel";
import validatorMiddleWare from "../../middlewares/validators";
import reviewsModel from "../../Models/reviewsModel";


export const createReviewValidator: RequestHandler[] = [
  check('comment')
    .notEmpty().withMessage('Comment is Required'),
    check('rating')
    .notEmpty().withMessage('Rating is Required'),
    check('user')
    .notEmpty().withMessage('User is Required')
    .isMongoId().withMessage('Invalid Mongo Id'),
  check('product')
    .notEmpty().withMessage('Product is Required')
    .isMongoId().withMessage('Invalid Mongo Id')
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
  .isMongoId().withMessage('Invalid Mongo Id')
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
  check('id').isMongoId().withMessage('Invalid Mongo Id'),
  validatorMiddleWare
]

export const deleteReviewValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage('Invalid Mongo Id')
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