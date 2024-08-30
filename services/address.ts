import {Request,Response,NextFunction} from "express";
import subcategoryModel from "../Models/subcategoryModel";
import { createOne, getAll, removeOne, updateOne } from "./refactorsHandler";
import { Address } from "../interfaces/addresses";
import addressesModel from "../Models/addressesModel";


export const addAddress = createOne<Address>(subcategoryModel);

export const getAllAddresses = getAll<Address>(addressesModel,'address');

export const updateAddress = updateOne<Address>(addressesModel);

export const deleteAddress = removeOne<Address>(addressesModel);


