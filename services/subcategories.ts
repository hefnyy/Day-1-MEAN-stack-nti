import {Request,Response,NextFunction} from "express";
import { Subcategory } from './../interfaces/subcategory';
import subcategoryModel from "../Models/subcategoryModel";
import { FilterData } from "../interfaces/filterData";
import { createOne, getAll, getOne, removeOne, updateOne } from "./refactorsHandler";
import { uploadOneImage } from "../middlewares/uploadPhotos";
import  asyncHandler  from 'express-async-handler';
import sharp from "sharp";


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

export const uploadSubsubcategoryImage = uploadOneImage('subcategoryImage');

export const resizeSubcategoryImage = asyncHandler(async (req:Request, res: Response, next:NextFunction) => {
  if (req.file) {
    const subcategoryImage: string = `SubCategory image-${Date.now()}.jpeg`
    await sharp(req.file.buffer).toFormat('jpeg').jpeg({ quality: 100 }).toFile(`uploads/subcategories/${subcategoryImage}`);
    req.body.subcategoryImage = subcategoryImage;
  }
  next();
});