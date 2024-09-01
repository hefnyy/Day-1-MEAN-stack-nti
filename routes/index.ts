import * as all from "../interfaces";
import { Application, Request, Response, NextFunction } from "express";
import categoriesRoute from "./categoriesRoute";
import subCategoryRoute from "./subcategoriesRoute";
import ApiErrors from "../utiles/APIErrors";
import globalErrors from "../middlewares/globalerrors";
import productsRoute from "./productsRoute";
import usersRoute from "./usersRoute";
import authenticationRoute from "./authenticationRoute";
import reviewsRoute from "./reviewsRoute";
import wishlistRoute from "./wishlistRoute";
// import addressRoute from "./addressesRoute";
import PromoCodesRoute from "./promoCodesRoute";
import cartsRoute from "./cartsRoute";
import ordersRoute from "./ordersRoute";



const mountRoutes = (app:Application):void => {

    app.use('/api/v1/categories',categoriesRoute)
    app.use('/api/v1/subcategory',subCategoryRoute)
    app.use('/api/v1/products', productsRoute)
    app.use('/api/v1/wishlist', wishlistRoute)
    app.use('/api/v1/reviews',reviewsRoute)
    app.use('/api/v1/users',usersRoute)
    app.use('/api/v1/authentication',authenticationRoute)
    // app.use('/api/v1/address',addressRoute)
    app.use('/api/v1/promocodes', PromoCodesRoute);
    app.use('/api/v1/carts', cartsRoute);
    app.use('/api/v1/orders', ordersRoute);


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