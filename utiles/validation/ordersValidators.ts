import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleWare from "../../middlewares/validators";

export const createOrderValidator: RequestHandler[] = [
  check('address')
  .notEmpty().withMessage('User address Required'),
  validatorMiddleWare
]

export const getOrderValidator: RequestHandler[] = [
  check('id')
  .isMongoId().withMessage((val, { req }) => req.__('check_id')),
  validatorMiddleWare
]