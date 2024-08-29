
import { NextFunction,Request,Response } from "express";
import categoriesModel from "../Models/categoriesModel";
import { Categories } from "../interfaces/categories";
import { uploadOneImage } from "../middlewares/uploadPhotos";
import { createOne, getAll, getOne, removeOne, updateOne } from "./refactorsHandler";
import  asyncHandler  from 'express-async-handler';
import sharp from "sharp";

export const createCategory = createOne<Categories>(categoriesModel); 

export const getAllCategories = getAll<Categories>(categoriesModel,'categories');

export const getCategory = getOne<Categories>(categoriesModel);

export const updateCategory = updateOne<Categories>(categoriesModel);

export const deleteCategory = removeOne<Categories>(categoriesModel);

export const uploadCategoryImage = uploadOneImage('categoryImage');

export const resizeCategoryImage = asyncHandler(async (req:Request, res: Response, next:NextFunction) => {
    if (req.file) {
      const categoryImage: string = `Category image-${Date.now()}.jpeg`
      await sharp(req.file.buffer).toFormat('jpeg').jpeg({ quality: 100 }).toFile(`uploads/categories/${categoryImage}`);
      req.body.categoryImage = categoryImage;
    }
    next();
  });
