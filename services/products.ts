import {Request,Response,NextFunction} from "express";
import { FilterData } from "../interfaces/filterData";
import { createOne, getAll, getOne, removeOne, updateOne } from "./refactorsHandler";
import { Products } from "../interfaces/Products";
import productsModel from "../Models/productsModel";
import multer from "multer";
import ApiErrors from "../utiles/APIErrors";

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1];
    const fileName = `Product-${Date.now()}-cover.${extension}`;
    cb(null,fileName);
  }
})
const imageFilter = function(req:Request,file:any,cb:any){
  if (file.mimetype.startsWith('image')) { cb(null, true) }
  else { cb(new ApiErrors('File Not an image', 400), false) }
}
export const upload = multer({ storage:multerStorage,fileFilter:imageFilter })

export const filterData = (req: Request, res: Response, next: NextFunction) => {
    let filterData: FilterData = {};
    if (req.params.categoryId) { filterData.category = req.params.categoryId };
    req.filterData = filterData;
    next();
  }

export const createProduct = createOne<Products>(productsModel);

export const getAllProducts = getAll<Products>(productsModel,'products');

export const getProduct = getOne<Products>(productsModel);

export const updateProduct = updateOne<Products>(productsModel);

export const deleteProduct = removeOne<Products>(productsModel);