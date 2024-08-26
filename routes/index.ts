import { Application } from "express";
import categoriesRoute from "./categoriesRoute";
import subCategoryRoute from "./subcategoriesRoute";


const mountRoutes = (app:Application):void => {
    app.use('/api/v1/categories',categoriesRoute)
    app.use('/api/v1/subcategory',subCategoryRoute)
}

export default mountRoutes;