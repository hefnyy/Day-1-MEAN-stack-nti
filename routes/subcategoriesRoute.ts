import {Router} from "express";
import { createSubcategory, deleteSubcategory, filterData, getAllSubcategories, getSubcategory, updateSubcategory } from "../services/subcategories";
import { createSubcategoryValidator, deleteSubcategoryValidator, getSubcategoryValidator, updateSubcategoryValidator } from "../utiles/validation/subcategoriesValidator";

const subCategoryRoute: Router = Router({ mergeParams: true });

subCategoryRoute.route('/')
.get(filterData,getAllSubcategories)
.post(createSubcategoryValidator,createSubcategory);

subCategoryRoute.route('/:id')
.get(getSubcategoryValidator, getSubcategory)
.put(updateSubcategoryValidator,updateSubcategory)
.delete(deleteSubcategoryValidator,deleteSubcategory)

export default subCategoryRoute;