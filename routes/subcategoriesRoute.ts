import {Router} from "express";
import { createSubcategory, deleteSubcategory, getAllSubcategories, getSubcategory, updateSubcategory } from "../services/subcategories";

const subCategoryRoute: Router = Router();

subCategoryRoute.route('/')
.get(getAllSubcategories)
.post(createSubcategory);

subCategoryRoute.route('/:id')
.get(getSubcategory)
.put(updateSubcategory)
.delete(deleteSubcategory)

export default subCategoryRoute;