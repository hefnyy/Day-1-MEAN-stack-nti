import {Request,Response,NextFunction} from "express";
import { Subcategory } from './../interfaces/subcategory';
import subcategoryModel from "../Models/subcategoryModel";
import { FilterData } from "../interfaces/filterData";
import { createOne, getAll, getOne, removeOne, updateOne } from "./refactorsHandler";


export const filterData = (req: Request, res: Response, next: NextFunction) => {
    let filterData: FilterData = {};
    if (req.params.categoryId) { filterData.category = req.params.categoryId };
    req.filterData = filterData;
    next();
  }

export const createSubcategory = createOne<Subcategory>(subcategoryModel);

export const getAllSubcategories = getAll<Subcategory>(subcategoryModel,'subcategory');

export const getSubcategory = getOne<Subcategory>(subcategoryModel);

export const updateSubcategory = updateOne<Subcategory>(subcategoryModel);

export const deleteSubcategory = removeOne<Subcategory>(subcategoryModel);