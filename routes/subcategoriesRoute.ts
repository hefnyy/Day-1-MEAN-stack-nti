import {Router} from "express";
import { createSubcategory, deleteSubcategory, filterData, getAllSubcategories, getSubcategory, resizeSubcategoryImage, setCategoryId, updateSubcategory, uploadSubsubcategoryImage } from "../services/subcategories";
import { createSubcategoryValidator, deleteSubcategoryValidator, getSubcategoryValidator, updateSubcategoryValidator } from "../utiles/validation/subcategoriesValidator";
import { allowedTo, isActive, protectRoutes } from "../services/authentication";

const subCategoryRoute: Router = Router({ mergeParams: true });

subCategoryRoute.route('/')
.get(filterData,getAllSubcategories)
.post(protectRoutes,isActive,allowedTo('admin','manager'),uploadSubsubcategoryImage,resizeSubcategoryImage,setCategoryId,createSubcategoryValidator,createSubcategory);

subCategoryRoute.route('/:id')
.get(getSubcategoryValidator, getSubcategory)
.put(protectRoutes,isActive,allowedTo('admin','manager'),uploadSubsubcategoryImage,resizeSubcategoryImage,updateSubcategoryValidator,updateSubcategory)
.delete(protectRoutes,isActive,allowedTo('admin','manager'),deleteSubcategoryValidator,deleteSubcategory)

export default subCategoryRoute;