import {Router} from "express";
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from "../utiles/validation/categoriesValidator";
import {createUser, deleteUser, getAllUsers, getUser, resizeUserImage, updateUser, uploadUserImageProfile} from "../services/users"
import { createUserValidator, deleteUserValidator, getUserValidator, updateUserValidator } from "../utiles/validation/usersValidator";
const usersRoute: Router = Router();

usersRoute.route('/')
.get(getAllUsers)
.post(uploadUserImageProfile,resizeUserImage,createUserValidator,createUser);

usersRoute.route('/:id')
.get(getUserValidator,getUser)
.put(uploadUserImageProfile,resizeUserImage,updateUserValidator,updateUser)
.delete(deleteUserValidator,deleteUser)

export default usersRoute;