import {Router} from "express";
import { createProduct, deleteProduct, getAllProducts, getProduct, resizeImages,  updateProduct,  uploadProductPhotos } from "../services/products";
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from "../utiles/validation/productsValidator";

const productsRoute: Router = Router();

productsRoute.route('/')
.get(getAllProducts)
.post(uploadProductPhotos,resizeImages,createProductValidator,createProduct);

productsRoute.route('/:id')
.get(getProductValidator, getProduct)
.put(updateProductValidator,updateProduct)
.delete(deleteProductValidator,deleteProduct)

export default productsRoute;