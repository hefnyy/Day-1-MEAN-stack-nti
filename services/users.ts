import { Users } from "../interfaces/users";
import usersModel from "../Models/usersModel";
import { createOne, removeOne, getAll, getOne } from './refactorsHandler';
import  asyncHandler  from 'express-async-handler';
import { Request, Response, NextFunction } from "express";
import ApiErrors from "../utiles/APIErrors";
import { uploadOneImage } from "../middlewares/uploadPhotos";
import sharp from "sharp";



export const createUser = createOne<Users>(usersModel)

export const uploadUserImageProfile = uploadOneImage('profileImage');

export const resizeUserImage = asyncHandler(async (req:Request, res: Response, next:NextFunction) => {
    if (req.file) {
      const profileImageName: string = `User profile picture image-${Date.now()}.jpeg`
      await sharp(req.file.buffer).toFormat('jpeg').jpeg({ quality: 100 }).toFile(`uploads/users/${profileImageName}`);
      req.body.profileImage = profileImageName;
    }
    next();
  });

export const getAllUsers = getAll<Users>(usersModel, 'users');

export const getUser = getOne<Users>(usersModel);

export const deleteUser = removeOne<Users>(usersModel);

export const updateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await usersModel.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      image: req.body.profileImage,
      active: req.body.active
    }, 
    { new: true })
    if (!user) { return next(new ApiErrors('User is not found', 404)) };
    res.status(200).json({ data: user, message: 'User has been updated successfully' })
  });

