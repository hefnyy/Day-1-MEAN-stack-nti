import {Router} from "express";
import { allowedTo, isActive, protectRoutes } from "../services/authentication";
import { addAddress, deleteAddress, getAllAddresses, updateAddress } from "../services/address";

const addressRoute: Router = Router();

addressRoute.route('/')
.get(protectRoutes,isActive,allowedTo('user'),getAllAddresses)
.post(protectRoutes,isActive,allowedTo('user'),addAddress);

addressRoute.route('/:id')
.put(protectRoutes,isActive,allowedTo('user'),updateAddress)
.delete(protectRoutes,isActive,allowedTo('user'),deleteAddress)

export default addressRoute;