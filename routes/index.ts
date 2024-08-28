import { Application, Request, Response, NextFunction } from "express";
import categoriesRoute from "./categoriesRoute";
import subCategoryRoute from "./subcategoriesRoute";
import ApiErrors from "../utiles/APIErrors";
import globalErrors from "../middlewares/globalerrors";
import * as all from "../interfaces";
import productsRoute from "./productsRoute";
import usersRoute from "./usersRoute";

const mountRoutes = (app:Application):void => {

    app.use('/api/v1/categories',categoriesRoute)
    app.use('/api/v1/subcategory',subCategoryRoute)
    app.use('/api/v1/products', productsRoute)
    app.use('/api/v1/users',usersRoute)

    app.all('*',(req: Request, res: Response, next: NextFunction) => {
        next(new ApiErrors(`The route ${req.originalUrl} is not found`,400))
            // app.use((err:Error,req:Request,res:Response,next:NextFunction) => {
    //     res.status(400).json({err})
    })
    app.use(globalErrors);
    // app.all('*',(req:Request,res:Response,next:NextFunction) => {
    //     const err = new Error("Can not find the route")
    //     next(err.message)
    // })
    // app.use((err:Error,req:Request,res:Response,next:NextFunction) => {
    //     res.status(400).json({err})
    // })
}

export default mountRoutes;