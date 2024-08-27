import {Router} from "express";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct, upload } from "../services/products";
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from "../utiles/validation/productsValidator";

const productsRoute: Router = Router();

productsRoute.route('/')
.get(getAllProducts)
.post(upload.single('cover'),createProductValidator,createProduct);

productsRoute.route('/:id')
.get(getProductValidator, getProduct)
.put(updateProductValidator,updateProduct)
.delete(deleteProductValidator,deleteProduct)

export default productsRoute;