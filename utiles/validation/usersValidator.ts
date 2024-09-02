import { RequestHandler } from "express";
import { check } from "express-validator";
import usersModel from "../../Models/usersModel";
import validatorMiddleWare from "../../middlewares/validators";
import  bcrypt  from 'bcryptjs';


export const createUserValidator: RequestHandler[] = [
  check('name')
    .notEmpty().withMessage((val, { req }) => req.__('name_required'))
    .isLength({ min: 3, max: 50 }).withMessage((val, { req }) => req.__('name_length')),
  check('email')
    .notEmpty().withMessage((val, { req }) => req.__('email_required'))
    .isEmail().withMessage((val, { req }) => req.__('invalid_email'))
    .custom(async (val: string) => {
      const user = await usersModel.findOne({ email: val });
      if (user) { throw new Error(`Email is already exist`) }
      return true;
    }),
  check('password')
    .notEmpty().withMessage((val, { req }) => req.__('password_required'))
    .isLength({ min: 6, max: 20 }).withMessage((val, { req }) => req.__('password_length'))
    .custom((val: string, { req }) => {
      if (val !== req.body.confirmPassword) { throw new Error("Passwords doesn't match") }
      return true
    }),
  check('confirmPassword')
    .notEmpty().withMessage((val, { req }) => req.__('confirm_required'))
    .isLength({ min: 6, max: 20 }).withMessage((val, { req }) => req.__('confirm_length')),
  validatorMiddleWare
]

export const updateUserValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage((val, { req }) => req.__('check_id')),
  check('name').optional()
    .isLength({ min: 3, max: 50 }).withMessage((val, { req }) => req.__('name_length')),
  check('active').optional()
    .isBoolean().withMessage((val, { req }) => req.__('invalid_active')),
    validatorMiddleWare
]

export const getUserValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage((val, { req }) => req.__('check_id')),
  validatorMiddleWare
]

export const deleteUserValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage((val, { req }) => req.__('check_id')),
  validatorMiddleWare
]

export const updateLoggedInUserValidator: RequestHandler[] = [
  check('name').optional()
    .isLength({ min: 3, max: 50 }).withMessage((val, { req }) => req.__('name_length')),
    validatorMiddleWare
]

export const changeUserPasswordValidator: RequestHandler[] = [
  check('password')
    .notEmpty().withMessage((val, { req }) => req.__('password_required'))
    .isLength({ min: 6, max: 20 }).withMessage((val, { req }) => req.__('password_length'))
    .custom((val: string, { req }) => {
      if (val !== req.body.confirmPassword) { throw new Error("Passwords doesn't match") }
      return true
    }),
  check('confirmPassword')
    .notEmpty().withMessage((val, { req }) => req.__('confirm_required'))
    .isLength({ min: 6, max: 20 }).withMessage((val, { req }) => req.__('confirm_length')),
  validatorMiddleWare
]

export const changeLoggedInUserPasswordValidator: RequestHandler[] = [
  check('currentPassword')
  .notEmpty().withMessage((val, { req }) => req.__('currpassword_required'))
  .isLength({ min: 6, max: 20 }).withMessage((val, { req }) => req.__('currpassword_length')),
  check('password')
    .notEmpty().withMessage((val, { req }) => req.__('password_required'))
    .isLength({ min: 6, max: 20 }).withMessage((val, { req }) => req.__('password_length'))
    .custom(async (val: string, { req }) => {
      const user = await usersModel.findById(req.user._id);
      const isCorrect: boolean = await bcrypt.compare(req.body.currentPassword,user!.password);
      if(!isCorrect){
        throw new Error('Current password is not valid')
      }
      if (val !== req.body.confirmPassword) { 
        throw new Error("Passwords doesn't match") 
      }
      return true
    }),
  check('confirmPassword')
    .notEmpty().withMessage((val, { req }) => req.__('confirm_required'))
    .isLength({ min: 6, max: 20 }).withMessage((val, { req }) => req.__('confirm_length')),
  validatorMiddleWare
]