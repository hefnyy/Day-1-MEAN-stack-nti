import multer from "multer";
import ApiErrors from "../utiles/APIErrors";
import { Request } from "express";
import { ImagesFields } from "../interfaces/uploadedFields";

//  const uploadOption = (): multer.Multer => {
//     const multerStorage: multer.StorageEngine=multer.memoryStorage();
//     const imageFilter=function(req:Request,file:Express.Multer.File,cb:multer.FileFilterCallback){
//         if(file.mimetype.startsWith('image'))
//         {
//             cb(null,true)
//         } else{
//             cb(new ApiErrors(`${req.__('not_image')}`,400))
//         }
//     }
//     const upload = multer({storage: multerStorage,fileFilter:imageFilter});
//     return upload;
// };
const uploadOption = (): multer.Multer => {
    // const multerStorage = multer.diskStorage({
    //   destination: function (req: Request, file: Express.Multer.File, cb) {
    //     cb(null, 'uploads')
    //   },
    //   filename: function (req, file, cb) {
    //     const ext = file.mimetype.split('/')[1];
    //     const fileName = `Product-${Date.now()}-cover.jpg`;
    //     cb(null, fileName)
    //   }
    // })
    const multerStorage: multer.StorageEngine = multer.memoryStorage();

    const multerFilter = function (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
        if (file.mimetype.startsWith('image')) { cb(null, true) }
        else { cb(new ApiErrors('File Not an image', 400)) }
    }

    const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
    return upload;
}

    
export const uploadOneImage = (fieldName:string)=> {return uploadOption().single(fieldName)};

export const uploadMultipleImages = (fields:ImagesFields[])=> uploadOption().fields(fields)
