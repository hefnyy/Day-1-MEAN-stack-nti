import {Router} from "express";
import { createCategory, deleteCategory, getAllCategories, getCategory, resizeCategoryImage, updateCategory, uploadCategoryImage } from "../services/categories";
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from "../utiles/validation/categoriesValidator";
import subCategoryRoute from "./subcategoriesRoute";
import { allowedTo, isActive, protectRoutes } from "../services/authentication";


const categoriesRoute: Router = Router();

categoriesRoute.use('/:categoryId/subcategory', subCategoryRoute);

categoriesRoute.route('/')
.get(getAllCategories)
.post(protectRoutes,isActive,allowedTo('admin','manager'),uploadCategoryImage,resizeCategoryImage,createCategoryValidator,createCategory);

categoriesRoute.route('/:id')
.get(getCategoryValidator,getCategory)
.put(protectRoutes,isActive,allowedTo('admin','manager'),uploadCategoryImage,resizeCategoryImage,updateCategoryValidator,updateCategory)
.delete(protectRoutes,isActive,allowedTo('admin','manager'),deleteCategoryValidator,deleteCategory)

export default categoriesRoute;