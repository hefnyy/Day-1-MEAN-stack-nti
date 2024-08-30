import {Request,Response,NextFunction} from "express";
import { FilterData } from "../interfaces/filterData";
import { createOne, getAll, getOne, removeOne, updateOne } from "./refactorsHandler";
import { Products } from "../interfaces/Products";
import productsModel from "../Models/productsModel";
import multer, { memoryStorage } from "multer";
import ApiErrors from "../utiles/APIErrors";
import sharp from "sharp";
import  asyncHandler  from 'express-async-handler';
import { uploadMultipleImages, uploadOneImage } from "../middlewares/uploadPhotos";




// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     const extension = file.mimetype.split('/')[1];
//     const fileName = `Product-${Date.now()}-cover.${extension}`;
//     cb(null,fileName);
//   }
// })
// const imageFilter = function(req:Request,file:any,cb:any){
//   if (file.mimetype.startsWith('image')) { cb(null, true) }
//   else { cb(new ApiErrors('File Not an image', 400), false) }
// }
// export const upload = multer({ storage:multerStorage,fileFilter:imageFilter })

//////////////////////////////////////////////////////////////////////////////////////////

// export const resizeImage = asyncHandler(async (req:Request,res:Response,next:NextFunction) => {
//   if(req.file){ 
//     const coverName: string = `Product\'s cover name ${Date.now()}.jpeg`
//    await sharp(req.file.buffer).toFormat('jpeg').jpeg({quality:100}).toFile(`uploads/products/${coverName}`)
//      req.body.cover = coverName;
//  }

//    next();
// })

export const uploadProductPhotos = uploadMultipleImages([
  {name:'cover',maxCount:1},
  {name:'images',maxCount:3}])

export const resizeImages = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
 if(req.files){
  if(req.files.cover){
    const coverName: string = `Product\'s cover name ${Date.now()}.jpeg`
    await sharp(req.files.cover[0].buffer).toFormat('jpeg').jpeg({quality:100}).toFile(`uploads/products/${coverName}`)
    req.body.cover = coverName;
  }
  if(req.files.images){
      req.body.images=[];
      req.files.images.map(async (img:any,index:number) => {
      const imageName:string = `Product\'s image name ${Date.now()}-num${index +1}.jpeg`;
      await sharp(img.buffer).toFormat('jpeg').jpeg({quality:100}).toFile(`uploads/products/${imageName}`);
      req.body.images.push(imageName); 
      })
  }
 }
  next();
})



export const filterData = (req: Request, res: Response, next: NextFunction) => {
    let filterData: FilterData = {};
    if (req.params.categoryId) { filterData.category = req.params.categoryId };
    req.filterData = filterData;
    next();
  }

export const createProduct = createOne<Products>(productsModel);

export const getAllProducts = getAll<Products>(productsModel,'products');

export const getProduct = getOne<Products>(productsModel,'reviews');

export const updateProduct = updateOne<Products>(productsModel);

export const deleteProduct = removeOne<Products>(productsModel);