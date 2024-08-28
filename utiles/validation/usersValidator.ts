import { RequestHandler } from "express";
import { check } from "express-validator";
import usersModel from "../../Models/usersModel";
import validatorMiddleWare from "../../middlewares/validators";


export const createUserValidator: RequestHandler[] = [
  check('name')
    .notEmpty().withMessage('User Name is Required')
    .isLength({ min: 3, max: 50 }).withMessage('Name length must be between 3 and 50'),
  check('email')
    .notEmpty().withMessage('Email is Required')
    .isEmail().withMessage('Invalid Email')
    .custom(async (val: string) => {
      const user = await usersModel.findOne({ email: val });
      if (user) { throw new Error(`Email is already exist`) }
      return true;
    }),
  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6, max: 20 }).withMessage('Password length must be between 6 and 20 char')
    .custom((val: string, { req }) => {
      if (val !== req.body.confirmPassword) { throw new Error("Passwords doesn't match") }
      return true
    }),
  check('confirmPassword')
    .notEmpty().withMessage('Confirm password is required')
    .isLength({ min: 6, max: 20 }).withMessage('Confirm Password length must be between 6 and 20 char'),
  validatorMiddleWare
]

export const updateUserValidator: RequestHandler[] = [
  check('name').optional()
    .isLength({ min: 3, max: 50 }).withMessage('Name length must be between 2 and 50'),
  check('active').optional()
    .isBoolean().withMessage('Invalid Active value'),
    validatorMiddleWare
]

export const getUserValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage('Invalid Mongo Id'),
  validatorMiddleWare
]

export const deleteUserValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage('Invalid Mongo Id'),
  validatorMiddleWare
]