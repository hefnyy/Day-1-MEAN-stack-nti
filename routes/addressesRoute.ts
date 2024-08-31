import {Router} from "express";
import { allowedTo, isActive, protectRoutes } from "../services/authentication";
import { addAddressToLoggedInUser, deleteAddress } from "../services/address";

const addressRoute: Router = Router();

addressRoute.route('/')
    .post(protectRoutes,isActive,allowedTo('user'),addAddressToLoggedInUser);

addressRoute.route('/:addressId')       
    .delete(protectRoutes,isActive,allowedTo('user'),deleteAddress)

export default addressRoute;