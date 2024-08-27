import {Router} from "express";
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../services/categories";
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from "../utiles/validation/categoriesValidator";
import subCategoryRoute from "./subcategoriesRoute";


const categoriesRoute: Router = Router();

categoriesRoute.use('/:categoryId/subcategory', subCategoryRoute);

categoriesRoute.route('/')
.get(getAllCategories)
.post(createCategoryValidator,createCategory);

categoriesRoute.route('/:id')
.get(getCategoryValidator,getCategory)
.put(updateCategoryValidator,updateCategory)
.delete(deleteCategoryValidator,deleteCategory)

export default categoriesRoute;