import {Router} from "express";
import { createProduct, deleteProduct, getAllProducts, getProduct, resizeImages,  updateProduct,  uploadProductPhotos } from "../services/products";
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from "../utiles/validation/productsValidator";
import { allowedTo, isActive, protectRoutes } from "../services/authentication";
import reviewsRoute from "./reviewsRoute";

const productsRoute: Router = Router();

productsRoute.use('/:productId/reviews',reviewsRoute);

productsRoute.route('/')
.get(getAllProducts)
.post(protectRoutes,isActive,allowedTo('manager','admin'),uploadProductPhotos,resizeImages,createProductValidator,createProduct);

productsRoute.route('/:id')
.get(getProductValidator, getProduct)
.put(protectRoutes,isActive,allowedTo('manager','admin'),updateProductValidator,updateProduct)
.delete(protectRoutes,isActive,allowedTo('manager','admin'),deleteProductValidator,deleteProduct)

export default productsRoute;