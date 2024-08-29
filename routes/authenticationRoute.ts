import {Router} from "express";
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from "../utiles/validation/categoriesValidator";
import {createUser, deleteUser, getAllUsers, getUser, resizeUserImage, updateUser, uploadUserImageProfile} from "../services/users"
import { createUserValidator, deleteUserValidator, getUserValidator, updateUserValidator } from "../utiles/validation/usersValidator";
import { login, signup } from './../services/authentication';
const authenticationRoute: Router = Router();

authenticationRoute.route('/signup')
    .post(createUserValidator,signup);
// .get(getAllUsers)
authenticationRoute.route('/login')
    .post(login);

// authenticationRoute.route('/:id')
// .get(getUserValidator,getUser)
// .put(uploadUserImageProfile,resizeUserImage,updateUserValidator,updateUser)
// .delete(deleteUserValidator,deleteUser)

export default authenticationRoute;