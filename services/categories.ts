
import categoriesModel from "../Models/categoriesModel";
import { Categories } from "../interfaces/categories";
import { createOne, getAll, getOne, removeOne, updateOne } from "./refactorsHandler";

export const createCategory = createOne<Categories>(categoriesModel); 

export const getAllCategories = getAll<Categories>(categoriesModel,'categories');

export const getCategory = getOne<Categories>(categoriesModel);

export const updateCategory = updateOne<Categories>(categoriesModel);

export const deleteCategory = removeOne<Categories>(categoriesModel);