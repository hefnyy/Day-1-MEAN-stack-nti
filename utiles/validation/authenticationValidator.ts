import { RequestHandler } from "express";
import { check } from "express-validator";
import usersModel from "../../Models/usersModel";
import validatorMiddleWare from "../../middlewares/validators";

export const signupValidator: RequestHandler[] = [
  check('name')
    .notEmpty().withMessage((val, { req }) => req.__('name_required'))
    .isLength({ min: 3, max: 50 }).withMessage((val, { req }) => req.__('name_length')),
  check('email')
    .notEmpty().withMessage((val, { req }) => req.__('email_required'))
    .isEmail().withMessage((val, { req }) => req.__('invalid_email'))
    .custom(async (val: string) => {
      const user = await usersModel.findOne({ email: val });
      if (user) { throw new Error('This Email is already exist') }
      return true;
    }),
  check('password')
    .notEmpty().withMessage((val, { req }) => req.__('password_required'))
    .isLength({ min: 6, max: 20 }).withMessage((val, { req }) => req.__('password_length'))
    .custom((val: string, { req }) => {
      if (val !== req.body.confirmPassword) { throw new Error("Passwords don't match") }
      return true
    }),
  check('confirmPassword')
    .notEmpty().withMessage((val, { req }) => req.__('confirm_required'))
    .isLength({ min: 6, max: 20 }).withMessage((val, { req }) => req.__('confirm_length')),
    check('phoneNumber')
    .notEmpty().withMessage((val, { req }) => req.__('phone_req'))
    .isMobilePhone('ar-EG').withMessage((val, { req }) => req.__('invalid_phone')),
  validatorMiddleWare
]

export const loginValidator: RequestHandler[] = [
  check('email')
    .notEmpty().withMessage((val, { req }) => req.__('email_required'))
    .isEmail().withMessage((val, { req }) => req.__('invalid_email')),
  check('password')
    .notEmpty().withMessage((val, { req }) => req.__('password_required'))
    .isLength({ min: 6, max: 20 }).withMessage((val, { req }) => req.__('password_length')),
    validatorMiddleWare
]

export const sendMailValidator: RequestHandler[] = [
  check('email')
    .notEmpty().withMessage((val, { req }) => req.__('email_required'))
    .isEmail().withMessage((val, { req }) => req.__('invalid_email')),
    validatorMiddleWare
]

export const resetCodeValidator: RequestHandler[] = [
  check('password')
    .notEmpty().withMessage((val, { req }) => req.__('password_required'))
    .isLength({ min: 6, max: 20 }).withMessage((val, { req }) => req.__('password_length'))
    .custom((val: string, { req }) => {
      if (val !== req.body.confirmPassword) { throw new Error("passwords doesn't match") }
      return true
    }),
  check('confirmPassword')
    .notEmpty().withMessage((val, { req }) => req.__('confirm_required'))
    .isLength({ min: 6, max: 20 }).withMessage((val, { req }) => req.__('confirm_length')),
    validatorMiddleWare
]