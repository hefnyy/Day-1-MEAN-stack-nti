import {Request,Response,NextFunction} from "express";
import asyncHandler from "express-async-handler";
import { Subcategory } from './../interfaces/subcategory';
import subcategoryModel from "../Models/subcategoryModel";

export const createSubcategory= asyncHandler( async (req:Request,res:Response,next:NextFunction) => {
    const subcategory:Subcategory = await subcategoryModel.create(req.body);
    res.status(201).json({data: subcategory})
})

export const getAllSubcategories= asyncHandler( async (req:Request,res:Response,next:NextFunction) =>{
    const subcategories = await subcategoryModel.find();
    res.status(200).json({data: subcategories})
})

export const getSubcategory= asyncHandler( async (req:Request,res:Response,next:NextFunction) => {
    const subcategory = await subcategoryModel.findById(req.params.id);
    res.status(200).json({data: subcategory})
})

export const updateSubcategory= asyncHandler( async (req:Request,res:Response,next:NextFunction) => {
    const subcategory = await subcategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json({data: subcategory})
})

export const deleteSubcategory= asyncHandler( async (req:Request,res:Response,next:NextFunction) => {
    const subcategory = await subcategoryModel.findByIdAndDelete(req.params.id);
    res.status(204).json()
})