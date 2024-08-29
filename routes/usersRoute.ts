import {Router} from "express";
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from "../utiles/validation/categoriesValidator";
import {changeUserPassword, createUser, deleteUser, getAllUsers, getUser, resizeUserImage, updateUser, uploadUserImageProfile} from "../services/users"
import { createUserValidator, deleteUserValidator, getUserValidator, updateUserValidator } from "../utiles/validation/usersValidator";
import { allowedTo, isActive, protectRoutes } from "../services/authentication";
const usersRoute: Router = Router();

usersRoute.use(protectRoutes,isActive,allowedTo('manager'))

usersRoute.route('/')
.get(getAllUsers)
.post(uploadUserImageProfile,resizeUserImage,createUserValidator,createUser);

usersRoute.route('/:id')
.get(getUserValidator,getUser)
.put(uploadUserImageProfile,resizeUserImage,updateUserValidator,updateUser)
.delete(deleteUserValidator,deleteUser)

usersRoute.put('/:id/updatePassword',changeUserPassword)

export default usersRoute;