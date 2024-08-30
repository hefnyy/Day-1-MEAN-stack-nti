import { Router } from "express";
import { allowedTo, isActive, protectRoutes } from "../services/authentication";
import { addProductToWishlist, getLoggedUserWishlist, removeProductFromWishlist } from "../services/wishlist";

const wishlistRoute: Router = Router();
wishlistRoute
    .use(protectRoutes, isActive, allowedTo('user'))

wishlistRoute.route('/')
  .get(getLoggedUserWishlist)
  .post(addProductToWishlist)

wishlistRoute.route('/:product')
  .delete(removeProductFromWishlist)

export default wishlistRoute;