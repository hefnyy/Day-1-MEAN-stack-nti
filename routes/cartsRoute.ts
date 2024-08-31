import { Router } from "express";
import { addProductToCart, applyPromoCode, clearCart, getLoggedInUserCart, removeProductFromCart, updateProductQuantity } from "../services/carts";
import { allowedTo, isActive, protectRoutes } from "../services/authentication";
import { addProductToCartValidator, removeProductFromCartValidator, updateProductQuantityValidator } from "../utiles/validation/cartsValidator";

const cartsRoute: Router = Router();
cartsRoute.use(protectRoutes, isActive, allowedTo('user'))

cartsRoute.route('/')
  .get(getLoggedInUserCart)
  .post(addProductToCartValidator, addProductToCart)
  .delete(clearCart);

cartsRoute.put('/applypromocode', applyPromoCode)

cartsRoute.route('/:itemId') //item id is belong to object id
  .put(updateProductQuantityValidator, updateProductQuantity)
  .delete(removeProductFromCartValidator, removeProductFromCart);

export default cartsRoute;