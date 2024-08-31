import { Router } from "express";
import { allowedTo, isActive, protectRoutes } from "../services/authentication";
import { createPromoCode, deletePromoCode, getAllPromoCodes, getPromoCode, sendPromoCodeEmail, updatePromoCode } from "../services/promoCodes";
import { createPromoCodeValidator, deletePromoCodeValidator, getPromoCodeValidator, updatePromoCodeValidator } from "../utiles/validation/promoCodesValidator";
import { sendMailValidator } from "../utiles/validation/authenticationValidator";

const PromoCodesRoute: Router = Router();
PromoCodesRoute.use(protectRoutes, isActive, allowedTo('manager', 'admin'))

PromoCodesRoute.route('/')
  .get(getAllPromoCodes)
  .post(createPromoCodeValidator, createPromoCode);

PromoCodesRoute.route('/:id')
  .get(getPromoCodeValidator, getPromoCode)
  .put(updatePromoCodeValidator, updatePromoCode)
  .delete(deletePromoCodeValidator, deletePromoCode);

  PromoCodesRoute.route('/sendpromocode')
    .post(sendMailValidator,sendPromoCodeEmail);    

export default PromoCodesRoute;